import React from 'react';

export default function OpLayout({ children }) {
  return (
    <div className="w-100 mw7-ns center mt3">
      <div className="fr w-100 mw7-ns center bg-white tj pv1 shadow-1 pa2 ma3 mb2">
        {children}
      </div>
    </div>
  );
}
