
import React, { useState, useRef } from 'react';

const PullToRefresh = ({ onRefresh, children }) => {
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const containerRef = useRef();

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = async (e) => {
    const currentY = e.touches[0].clientY;
    const scrollTop = containerRef.current?.scrollTop || 0;

    if (scrollTop === 0 && currentY - startY.current > 70 && !refreshing) {
      setRefreshing(true);
      try {
        await onRefresh();
      } catch (err) {
        console.error('Refresh failed', err);
      } finally {
        setRefreshing(false);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      style={{
        height: '100vh',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
        position: 'relative',
      }}
    >
      {refreshing && (
        <div
          style={{
            textAlign: 'center',
            padding: '12px',
            color: '#4CAF50',
            fontWeight: 'bold',
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd',
          }}
        >
          جاري التحديث...
        </div>
      )}
      {children}
    </div>
  );
};

export default PullToRefresh;
