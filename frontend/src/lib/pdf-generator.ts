import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const generatePDF = async (elementId: string): Promise<void> => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error("Element not found");
    }

    const canvas = await html2canvas(element, {
      scale: 4, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: null,
    });

    // Standard ID card dimensions (CR80 size - 3.375" x 2.125")
    const cardWidth = 85.6; // 3.375 inches in mm
    const cardHeight = 53.98; // 2.125 inches in mm

    // Create PDF with card dimensions and landscape orientation
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [cardHeight + 10, cardWidth + 10], // Add small margin
    });

    // Calculate positioning to center the card
    const xOffset = 5; // 5mm margin
    const yOffset = 5; // 5mm margin

    const imgData = canvas.toDataURL("image/png", 1.0);

    // Add white background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, cardWidth + 10, cardHeight + 10, "F");

    // Add the card image
    pdf.addImage(imgData, "PNG", xOffset, yOffset, cardWidth, cardHeight);

    // Optional: Add crop marks
    const markLength = 5;
    pdf.setLineWidth(0.1);
    pdf.setDrawColor(200, 200, 200);

    // Top-left
    pdf.line(0, 5, markLength, 5);
    pdf.line(5, 0, 5, markLength);

    // Top-right
    pdf.line(cardWidth + 10 - markLength, 5, cardWidth + 10, 5);
    pdf.line(cardWidth + 5, 0, cardWidth + 5, markLength);

    // Bottom-left
    pdf.line(0, cardHeight + 5, markLength, cardHeight + 5);
    pdf.line(5, cardHeight + 10 - markLength, 5, cardHeight + 10);

    // Bottom-right
    pdf.line(cardWidth + 10 - markLength, cardHeight + 5, cardWidth + 10, cardHeight + 5);
    pdf.line(cardWidth + 5, cardHeight + 10 - markLength, cardWidth + 5, cardHeight + 10);

    pdf.save("university-id-card.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};
