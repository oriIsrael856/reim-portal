import React from 'react';
import AdminPanelShell from './AdminPanelShell';

/**
 * Thin wrapper kept for routing compatibility.
 * All admin CMS logic now lives in AdminPanelShell + related components/hooks.
 */
const AdminPanel = ({ content, version }) => {
  return <AdminPanelShell content={content} version={version} />;
};

export default AdminPanel;