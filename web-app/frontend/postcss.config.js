export default {
  plugins: {
    // Import support for modular CSS
    'postcss-import': {},
    
    // Tailwind CSS
    tailwindcss: {},
    
    // Nested CSS rules
    'postcss-nested': {},
    
    // Autoprefixer with enhanced browser support
    autoprefixer: {
      overrideBrowserslist: [
        '>= 0.5%',
        'last 2 major versions',
        'not dead',
        'Chrome >= 60',
        'Firefox >= 60', 
        'Safari >= 12',
        'Edge >= 79'
      ],
      add: true,
      remove: true,
      supports: true,
      flexbox: 'no-2009',
      grid: 'autoplace'
    },
    
    // Production optimizations
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: ['default', {
          calc: false,
          colormin: false,
          convertValues: false,
          mergeLonghand: false,
          mergeRules: false,
          normalizePositions: false,
          reduceTransforms: false,
          orderedValues: false,
        }]
      }
    })
  }
}