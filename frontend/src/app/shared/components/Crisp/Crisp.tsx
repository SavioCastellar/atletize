'use client';
import { Component } from 'react';
import { Crisp } from 'crisp-sdk-web';

class CrispComponent extends Component {
  componentDidMount() {
    Crisp.configure(process.env.NEXT_PUBLIC_CRISP_KEY || '');
  }

  render() {
    return null;
  }
}
export default CrispComponent;
