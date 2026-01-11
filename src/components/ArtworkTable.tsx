import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import type { Artwork, ApiResponse } from '../types/Artwork';
import CustomSelectionPanel from './CustomSelectionPanel';

const ArtworkTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage] = useState(12);
  
  const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());
  
  const [showCustomPanel, setShowCustomPanel] = useState(false);

  const fetchArtworks = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${page + 1}&limit=${rowsPerPage}`
      );
      const data: ApiResponse = await response.json();
      
      setArtworks(data.data);
      setTotalRecords(data.pagination.total);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks(0);
  }, []);

  const onPageChange = (event: any) => {
    const newPage = event.page;
    setCurrentPage(newPage);
    fetchArtworks(newPage);
  };

  const onSelectionChange = (e: any) => {
    const newSelectedIds = new Set(selectedRowIds);
    
    if (e.value && e.value.length > 0) {
      e.value.forEach((artwork: Artwork) => {
        newSelectedIds.add(artwork.id);
      });
    }
    
    setSelectedRowIds(newSelectedIds);
  };

  const onSelectAllChange = (e: any) => {
    const newSelectedIds = new Set(selectedRowIds);
    
    if (e.checked) {
      artworks.forEach(artwork => {
        newSelectedIds.add(artwork.id);
      });
    } else {
      artworks.forEach(artwork => {
        newSelectedIds.delete(artwork.id);
      });
    }
    
    setSelectedRowIds(newSelectedIds);
  };

  const handleCustomSelect = (count: number) => {
    const newSelectedIds = new Set(selectedRowIds);
    
    const rowsToSelect = artworks.slice(0, count);
    rowsToSelect.forEach(artwork => {
      newSelectedIds.add(artwork.id);
    });
    
    setSelectedRowIds(newSelectedIds);
  };

  const getSelectedArtworks = () => {
    return artworks.filter(artwork => selectedRowIds.has(artwork.id));
  };

  const isAllCurrentPageSelected = () => {
    return artworks.length > 0 && artworks.every(artwork => selectedRowIds.has(artwork.id));
  };

  return (
    <div className="card">
      <div className="flex justify-content-between align-items-center mb-3">
        <h2>Artwork Gallery</h2>
        <div className="flex gap-2">
          <Button
            label="Custom Selection"
            icon="pi pi-check-square"
            onClick={() => setShowCustomPanel(true)}
          />
          <span style={{ fontSize: '14px', color: '#666' }}>
            Selected: {selectedRowIds.size} total
          </span>
        </div>
      </div>

      <DataTable
        value={artworks}
        loading={loading}
        paginator
        rows={rowsPerPage}
        totalRecords={totalRecords}
        lazy
        onPage={onPageChange}
        first={currentPage * rowsPerPage}
        selection={getSelectedArtworks()}
        onSelectionChange={onSelectionChange}
        selectAll={isAllCurrentPageSelected()}
        onSelectAllChange={onSelectAllChange}
        selectionMode="multiple"
        dataKey="id"
        tableStyle={{ minWidth: '50rem' }}
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
        
        <Column 
          field="title" 
          header="Title" 
          style={{ width: '25%' }}
          body={(rowData) => rowData.title || 'N/A'}
        />
        
        <Column 
          field="place_of_origin" 
          header="Place of Origin" 
          style={{ width: '15%' }}
          body={(rowData) => rowData.place_of_origin || 'N/A'}
        />
        
        <Column 
          field="artist_display" 
          header="Artist" 
          style={{ width: '20%' }}
          body={(rowData) => rowData.artist_display || 'N/A'}
        />
        
        <Column 
          field="inscriptions" 
          header="Inscriptions" 
          style={{ width: '20%' }}
          body={(rowData) => rowData.inscriptions || 'N/A'}
        />
        
        <Column 
          field="date_start" 
          header="Start Date" 
          style={{ width: '10%' }}
          body={(rowData) => rowData.date_start || 'N/A'}
        />
        
        <Column 
          field="date_end" 
          header="End Date" 
          style={{ width: '10%' }}
          body={(rowData) => rowData.date_end || 'N/A'}
        />
      </DataTable>

      <CustomSelectionPanel
        visible={showCustomPanel}
        onHide={() => setShowCustomPanel(false)}
        currentPageData={artworks}
        onCustomSelect={handleCustomSelect}
      />
    </div>
  );
};

export default ArtworkTable;