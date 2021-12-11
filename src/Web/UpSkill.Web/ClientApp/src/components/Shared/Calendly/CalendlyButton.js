import React from 'react';
import { PopupButton } from 'react-calendly';

export default function CalendlyButton() {
  return (
    <div>
      <PopupButton
        className="btn btn-primary"
        url="https://calendly.com/iltodbul"
        text="Book session"
        pageSettings={{
          backgroundColor: 'ffffff',
          hideEventTypeDetails: true,
          hideGdprBanner: true,
          hideLandingPageDetails: true,
          primaryColor: '00a2ff',
          textColor: '4d5055',
        }}
        prefill={{
          email: '', // TODO Get employee email to autocomplete
          firstName: '',
          lastName: '',
          name: '',
        }}
      />
    </div>
  );
}
