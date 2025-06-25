import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Load service account credentials
const credentials = {
  client_email: process.env.GOOGLE_CLIENT_EMAIL,
  private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

// Your Google Analytics property ID
const propertyId = process.env.GA_PROPERTY_ID;

export async function GET() {
  try {
    // Create a JWT client using service account credentials
    const auth = new google.auth.JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    // Create Analytics Data API client
    const analyticsDataClient = google.analyticsdata({
      version: 'v1beta',
      auth,
    });

    // Fetch total page views and comparison to previous period
    const pageViewsResponse = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today',
            name: 'current'
          },
          {
            startDate: '60daysAgo',
            endDate: '31daysAgo',
            name: 'previous'
          }
        ],
        metrics: [
          {
            name: 'screenPageViews'
          }
        ]
      }
    });

    // Fetch active users and comparison to previous period
    const activeUsersResponse = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today',
            name: 'current'
          },
          {
            startDate: '60daysAgo',
            endDate: '31daysAgo',
            name: 'previous'
          }
        ],
        metrics: [
          {
            name: 'activeUsers'
          }
        ]
      }
    });

    // Fetch click rate (event_count / sessions)
    const clickRateResponse = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today',
            name: 'current'
          },
          {
            startDate: '60daysAgo',
            endDate: '31daysAgo',
            name: 'previous'
          }
        ],
        metrics: [
          {
            name: 'eventCount'
          },
          {
            name: 'sessions'
          }
        ]
      }
    });

    // Fetch active sessions and comparison to previous period
    const activeSessionsResponse = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [
          {
            startDate: '30daysAgo',
            endDate: 'today',
            name: 'current'
          },
          {
            startDate: '60daysAgo',
            endDate: '31daysAgo',
            name: 'previous'
          }
        ],
        metrics: [
          {
            name: 'sessions'
          }
        ]
      }
    });

    // Fetch daily page views for the last 7 days
    const dailyPageViewsResponse = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [
          {
            startDate: '7daysAgo',
            endDate: 'today'
          }
        ],
        dimensions: [
          {
            name: 'date'
          }
        ],
        metrics: [
          {
            name: 'screenPageViews'
          }
        ],
        orderBys: [
          {
            dimension: {
              dimensionName: 'date'
            }
          }
        ]
      }
    });

    // Fetch daily active and new users for the last 7 days
    const dailyUsersResponse = await analyticsDataClient.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [
          {
            startDate: '7daysAgo',
            endDate: 'today'
          }
        ],
        dimensions: [
          {
            name: 'date'
          }
        ],
        metrics: [
          {
            name: 'activeUsers'
          },
          {
            name: 'newUsers'
          }
        ],
        orderBys: [
          {
            dimension: {
              dimensionName: 'date'
            }
          }
        ]
      }
    });

    // Process the responses to get the summary metrics
    const currentPageViews = parseInt(pageViewsResponse.data.rows?.[0]?.metricValues?.[0]?.value || '0');
    const previousPageViews = parseInt(pageViewsResponse.data.rows?.[1]?.metricValues?.[0]?.value || '0');
    const pageViewsPercentChange = previousPageViews === 0
      ? 0
      : ((currentPageViews - previousPageViews) / previousPageViews * 100).toFixed(1);

    const currentActiveUsers = parseInt(activeUsersResponse.data.rows?.[0]?.metricValues?.[0]?.value || '0');
    const previousActiveUsers = parseInt(activeUsersResponse.data.rows?.[1]?.metricValues?.[0]?.value || '0');
    const activeUsersPercentChange = previousActiveUsers === 0
      ? 0
      : ((currentActiveUsers - previousActiveUsers) / previousActiveUsers * 100).toFixed(1);

    // Calculate click rate (event count / sessions)
    const currentEvents = parseInt(clickRateResponse.data.rows?.[0]?.metricValues?.[0]?.value || '0');
    const currentSessions = parseInt(clickRateResponse.data.rows?.[0]?.metricValues?.[1]?.value || '1'); // Avoid division by zero
    const previousEvents = parseInt(clickRateResponse.data.rows?.[1]?.metricValues?.[0]?.value || '0');
    const previousSessions = parseInt(clickRateResponse.data.rows?.[1]?.metricValues?.[1]?.value || '1');

    const currentClickRate = (currentEvents / currentSessions * 100).toFixed(1);
    const previousClickRate = (previousEvents / previousSessions * 100).toFixed(1);
    const clickRatePercentChange = previousClickRate === '0.0'
      ? 0
      : ((parseFloat(currentClickRate) - parseFloat(previousClickRate)) / parseFloat(previousClickRate) * 100).toFixed(1);

    const currentActiveSessions = parseInt(activeSessionsResponse.data.rows?.[0]?.metricValues?.[0]?.value || '0');
    const previousActiveSessions = parseInt(activeSessionsResponse.data.rows?.[1]?.metricValues?.[0]?.value || '0');
    const activeSessionsPercentChange = previousActiveSessions === 0
      ? 0
      : ((currentActiveSessions - previousActiveSessions) / previousActiveSessions * 100).toFixed(1);

    // Process daily page views data for the chart
    const pageViewsChart = dailyPageViewsResponse.data.rows?.map(row => {
      const date = row.dimensionValues?.[0].value || '';
      // Convert YYYYMMDD to day of week
      const dateObj = new Date(
        parseInt(date.substring(0, 4)),
        parseInt(date.substring(4, 6)) - 1,
        parseInt(date.substring(6, 8))
      );
      const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateObj.getDay()];
      const views = parseInt(row.metricValues?.[0].value || '0');

      return {
        name: dayOfWeek,
        views: views
      };
    }) || [];

    // Process daily users data for the chart
    const userActivityChart = dailyUsersResponse.data.rows?.map(row => {
      const date = row.dimensionValues?.[0].value || '';
      // Convert YYYYMMDD to day of week
      const dateObj = new Date(
        parseInt(date.substring(0, 4)),
        parseInt(date.substring(4, 6)) - 1,
        parseInt(date.substring(6, 8))
      );
      const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dateObj.getDay()];
      const active = parseInt(row.metricValues?.[0].value || '0');
      const newUsers = parseInt(row.metricValues?.[1].value || '0');

      return {
        name: dayOfWeek,
        active: active,
        new: newUsers
      };
    }) || [];

    // Prepare the final dashboard data
    const dashboardData = {
      summary: {
        pageViews: {
          total: currentPageViews,
          percentChange: pageViewsPercentChange
        },
        activeUsers: {
          total: currentActiveUsers,
          percentChange: activeUsersPercentChange
        },
        clickRate: {
          rate: currentClickRate,
          percentChange: clickRatePercentChange
        },
        activeSessions: {
          total: currentActiveSessions,
          percentChange: activeSessionsPercentChange
        }
      },
      charts: {
        pageViews: pageViewsChart,
        userActivity: userActivityChart
      }
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching analytics dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics dashboard data' },
      { status: 500 }
    );
  }
}
