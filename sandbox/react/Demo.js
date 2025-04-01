import React, { forwardRef } from 'react';
import InnerImageZoom from '../../packages/react/src';
import '../../packages/react/src/styles.css';

const Demo = forwardRef(({ ...props }, ref) => {
  return (
    <div className="demo">
      <InnerImageZoom ref={ref} {...props} />

      <div className="demo__props">
        <ul>
          <li>
            <h3>Props</h3>
          </li>

          {Object.keys(props).map(
            (key) =>
              key !== 'imgAttributes' && (
                <li key={key}>
                  <strong>{key}:</strong> {props[key].toString()}
                </li>
              )
          )}
        </ul>

        {props.imgAttributes && (
          <ul>
            <li>
              <h3>Img Attributes</h3>
            </li>

            {Object.keys(props.imgAttributes).map((key) => (
              <li key={key}>
                <strong>{key}:</strong> {props.imgAttributes[key].toString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

Demo.displayName = 'Demo';

export default Demo;
