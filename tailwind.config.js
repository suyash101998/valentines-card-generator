/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        backgroundImage :{
            'card' : "url('https://images.unsplash.com/photo-1551772412-f984325ba4da?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        } ,
        height: {
          '128': '32rem',
        }
        
      },
      fontFamily: {
        content : ['Cute Font'],
        header : ['Love Ya Like A Sister']
      }
    },
    plugins: [],
  }