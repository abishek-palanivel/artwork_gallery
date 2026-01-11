import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import type { Artwork } from '../types/Artwork';

interface CustomSelectionPanelProps {
  visible: boolean;
  onHide: () => void;
  currentPageData: Artwork[];
  onCustomSelect: (count: number) => void;
}

const CustomSelectionPanel: React.FC<CustomSelectionPanelProps> = ({
  visible,
  onHide,
  currentPageData,
  onCustomSelect
}) => {
  const [selectCount, setSelectCount] = useState('');
  const [error, setError] = useState('');

  const handleSelect = () => {
    const count = parseInt(selectCount);
    
    if (!count || count <= 0) {
      setError('Please enter a valid number');
      return;
    }
    
    if (count > currentPageData.length) {
      setError(`Cannot select ${count} rows. Only ${currentPageData.length} rows available on current page.`);
      return;
    }
    
    setError('');
    onCustomSelect(count);
    setSelectCount('');
    onHide();
  };

  const handleClose = () => {
    setSelectCount('');
    setError('');
    onHide();
  };

  return (
    <Dialog
      header="Custom Row Selection"
      visible={visible}
      onHide={handleClose}
      style={{ width: '400px' }}
    >
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="selectCount">Number of rows to select:</label>
          <InputText
            id="selectCount"
            value={selectCount}
            onChange={(e) => setSelectCount(e.target.value)}
            placeholder="Enter number"
            type="number"
          />
        </div>
        
        {error && (
          <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>
            {error}
          </div>
        )}
        
        <div style={{ marginBottom: '10px', fontSize: '14px', color: '#666' }}>
          Available rows on current page: {currentPageData.length}
        </div>
        
        <div className="flex justify-content-end gap-2">
          <Button
            label="Cancel"
            severity="secondary"
            onClick={handleClose}
          />
          <Button
            label="Select"
            onClick={handleSelect}
          />
        </div>
      </div>
    </Dialog>
  );
};

export default CustomSelectionPanel;