module.exports = {
    theme: {
      extend: {
        animation: {
          blob: 'blob 20s infinite',
          'gradient': 'gradientBG 15s ease infinite',
        },
        keyframes: {
          blob: {
            '0%': { transform: 'translate(0px, 0px) scale(1)' },
            '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
            '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
            '100%': { transform: 'translate(0px, 0px) scale(1)' },
          },
          gradientBG: {
            '0%, 100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' },
            '50%': { backgroundSize: '200% 200%', backgroundPosition: 'right center' },
          },
        },
      },
    },
    plugins: [],
  };
  