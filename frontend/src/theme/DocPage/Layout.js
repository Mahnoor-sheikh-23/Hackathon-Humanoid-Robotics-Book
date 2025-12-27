import React from 'react';
import OriginalDocPageLayout from '@theme-original/DocPage/Layout';
import DocPersonalizationButton from '../components/DocPersonalizationButton';

// Custom layout that adds personalization button to documentation pages
const DocPageLayout = (props) => {
  return (
    <>
      <OriginalDocPageLayout {...props} />
      <div style={{ marginTop: '1rem' }}>
        <DocPersonalizationButton />
      </div>
    </>
  );
};

export default DocPageLayout;