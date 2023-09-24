import React, { useState, useRef, ChangeEvent } from 'react';
import { createRoot } from 'react-dom/client';
import './options.css';
import readXlsxFile, { Row } from 'read-excel-file';

interface PageData {
  pageurl: string;
  pageTemplate: string;
}

const App: React.FC<{}> = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const [pageData, setPageData] = useState<PageData[]>([]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target;
    if (input?.files) {
      readXlsxFile(input.files[0]).then((rows: Row[]) => {
        const [, ...data] = rows;

        const pageData = data.map((row) => ({
          pageurl: row[0] as string,
          pageTemplate: row[1] as string,
        }));

        setPageData(pageData);
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        id="input"
        ref={inputEl}
        onChange={onChangeHandler}
      />
      <div>
        <h2>Extracted Data:</h2>
        <ul>
          {pageData.map((item, index) => (
            <li key={index}>
              Page URL: {item.pageurl}, Page Template: {item.pageTemplate}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);

const reactRoot = createRoot(root);
reactRoot.render(<App />);
