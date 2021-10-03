import React from 'react';

const InsightItem = ({title, result}: {title: string, result: string}) => {
  return <div className="insight-item">
    <div><h2>{title}</h2></div>
    <div><h1>{result}</h1></div>
  </div>
}

const Insights = ({averageSize, latestDate, biggest} : {averageSize: number, latestDate: Date, biggest: number}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1em'}}>
      <InsightItem title='Avg. Size' result={averageSize.toFixed(2)}/>
      <InsightItem title='Latest' result={latestDate.toDateString()}/>
      <InsightItem title='Biggest' result={biggest.toFixed(2)}/>
    </div>
  );
};

export default Insights;