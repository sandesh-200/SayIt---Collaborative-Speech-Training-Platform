import React from 'react'

const Spinner = () => {
  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-sm backdrop-saturate-150"></div>

      
      {/* Spinner positioned on top of the blur */}
      <div className='relative z-10'>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" color='#2B766D' viewBox="0 0 24 24">
          <defs>
            <filter id="svgSpinnersGooeyBalls10">
              <feGaussianBlur in="SourceGraphic" result="y" stdDeviation="1.5"/>
              <feColorMatrix in="y" result="z" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7"/>
              <feBlend in="SourceGraphic" in2="z"/>
            </filter>
          </defs>
          <g fill="currentColor" filter="url(#svgSpinnersGooeyBalls10)">
            <circle cx="4" cy="12" r="3">
              <animate attributeName="cx" calcMode="spline" dur="0.75s" keySplines=".56,.52,.17,.98;.56,.52,.17,.98" repeatCount="indefinite" values="4;9;4"/>
              <animate attributeName="r" calcMode="spline" dur="0.75s" keySplines=".56,.52,.17,.98;.56,.52,.17,.98" repeatCount="indefinite" values="3;8;3"/>
            </circle>
            <circle cx="15" cy="12" r="8">
              <animate attributeName="cx" calcMode="spline" dur="0.75s" keySplines=".56,.52,.17,.98;.56,.52,.17,.98" repeatCount="indefinite" values="15;20;15"/>
              <animate attributeName="r" calcMode="spline" dur="0.75s" keySplines=".56,.52,.17,.98;.56,.52,.17,.98" repeatCount="indefinite" values="8;3;8"/>
            </circle>
          </g>
        </svg>
      </div>
    </div>
  )
}

export default Spinner