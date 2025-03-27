import React, { useEffect, useState, useRef } from 'react';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useParams } from 'react-router-dom';
import { useSpeech } from '../context/SpeechContext';

const SpeechReview = () => {
  const { speechId } = useParams();
  const { speechMetrics, fetchSpeechMetrics } = useSpeech();
  const chartRef = useRef(null);


  useEffect(() => {
    if (speechId) {
      fetchSpeechMetrics(speechId);
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [speechId]);

  if (!speechMetrics || !speechMetrics.metrics) return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-gray-500 text-xl">Loading metrics...</div>
    </div>
  );

  // Calculate percentages (5 as 100%)
  const calculatePercentage = (value) => {
    return Math.round((value / 5) * 100);
  };

  const percentageMetrics = Object.fromEntries(
    Object.entries(speechMetrics.metrics).map(([key, value]) => 
      [key, calculatePercentage(value)]
    )
  );

  const data = {
    labels: Object.keys(speechMetrics.metrics),
    datasets: [
      {
        label: 'Speech Metrics',
        data: Object.values(percentageMetrics),
        backgroundColor: 'rgba(32, 178, 170, 0.2)', // Teal with transparency
        borderColor: 'rgba(32, 178, 170, 1)', // Matching teal
        borderWidth: 2,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0,0,0,0.1)'
        },
        grid: {
          color: 'rgba(0,0,0,0.1)'
        },
        pointLabels: {
          font: {
            size: 12,
            family: 'Inter, sans-serif'
          }
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20,
          display: false
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mr-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{speechMetrics.title}</h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-96 w-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Performance Radar</h2>
            <Radar 
              data={data} 
              options={options} 
              ref={chartRef}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Detailed Metrics Breakdown</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(speechMetrics.metrics).map(([key, value]) => {
                const percentage = calculatePercentage(value);
                return (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 font-medium">{key}</span>
                      <span className="text-teal-600 font-bold">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-teal-600 h-2.5 rounded-full" 
                        style={{width: `${percentage}%`}}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Insights</h3>
          <p className="text-gray-600">
            This analysis provides a comprehensive view of your speech performance across key metrics. 
            Each metric is scored on a scale where 5 represents 100% excellence. 
            Use these insights to identify strengths and areas for improvement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpeechReview;