tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B1F3A', 900: '#071429', 700: '#1B3257' },
        ivory: { DEFAULT: '#F8F4EC', 2: '#F1EADC' },
        gold: { DEFAULT: '#D89B25', soft: '#E9BC5E', ink: '#8A5C0E' },
        sage: { DEFAULT: '#7C9270', ink: '#4E6445' },
        muted: '#4A5872',
        line: '#E4D9C3'
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'sans-serif']
      },
      maxWidth: { site: '76rem' }
    }
  }
};
