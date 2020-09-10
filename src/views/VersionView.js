import React from 'react';
import { version } from 'src/lib/version';
import Page from 'src/components/Page';

const VersionView = () => {
  return <Page title="Version">{version}</Page>;
};

export default VersionView;
