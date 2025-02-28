import React, { useEffect, useState } from 'react';

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    // Find elements with the specified classes
    const e: any = document.querySelector('.cursor-inner');
    const t: any = document.querySelector('.cursor-outer');

    let n,
      i = 0;
    const o = false;

    window.onmousemove = function (s: any) {
      if (!o) {
        t.style.transform =
          'translate(' + s.clientX + 'px, ' + s.clientY + 'px)';
      }
      e.style.transform = 'translate(' + s.clientX + 'px, ' + s.clientY + 'px)';
      n = s.clientY;
      i = s.clientX;
    };       

    e.style.visibility = 'visible';
    t.style.visibility = 'visible';

    const anchor = document.getElementsByTagName('a');
    Array.from(anchor).map((item: any) => {
      item.addEventListener('mouseover', () => {
        setIsHovered(true);
      });
      item.addEventListener('mouseout', () => {
        setIsHovered(false);
      });
    });
  }, [isHovered]);

  return (
    <>
      <div
        className={`mouse-cursor cursor-outer ${
          isHovered ? 'cursor-hover' : ''
        }`}
      ></div>
      <div className={`mouse-cursor cursor-inner ${
          isHovered ? 'cursor-hover' : ''
        }`}></div>
    </>
  );
};

export default Cursor;
