/**
 * Returns a template literal of CSS stylesheet
 *
 * @returns {string} Template literal string of CSS code for injecting Client-side stylesheet
 */
exports.styles = () => `
  html {
    height: 100%;
  }

  .body {
    background-color: #145ED7;
    height: 100%;
  }

  .log {
    font-weight: bold;
  }

  .title {
    font-weight: 400;

    &.text-custom {
      font-size: 30px;
    }

    &.bold {
      font-weight: 700;
    }
  }

  .text-custom {
    color: #FFE000;
  }

  .btn.btn-custom {
    background-color: #FFE000;
    color: #112568;
    font-weight: 900;
    border-radius: 100px;
    width: 300px;
    
    & span.text-center {
      font-weight: 500;
    }
  }

  .flag {
    width: auto;
    height: 20px;
    border-radius: 3px;
  }

  .mainNav {
    text-decoration: none;
    color: #999;
    width: 300px;
  }

  .table-responsive {
    border-radius: 8px;
    font-size: 13px;
  }

  th, td {
    text-wrap: nowrap;
  }

  th:not(:first-child),
  td:not(:first-child) {
    text-align: center;
  }

  .table-responsive {
    font-size: 10px;
  }

  @media screen and (max-width: 300px) {
    .mainNav {
      width: 100%;
    }

    .btn.btn-custom {
      width: 100%;
    }
  }

  @media screen and (min-width: 480px) {
    .table-responsive {
      font-size: 16px;
    }
    
    .flag {
      height: 30px;
      border-radius: 6px;
    }
  }
`;
