exports.styles = `
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

  .text-custom {
    color: #FFE000;
    font-weight: 400;
    
    &.bold {
      font-weight: 700;
    }
  }

  .btn.btn-custom {
    background-color: #FFE000;
    color: #112568;
    font-weight: 900;
    border-radius: 100px;
    font-size: larger;

    & span.text-center {
      font-weight: 500;
    }
  }

  .flag {
    width: auto;
    height: 30px;
    border-radius: 5px;
  }

  .mainNav {
    text-decoration: none;
    color: #999;
    width: 300px;
  }

  .table-responsive {
    border-radius: 8px;
  }

  th:not(:first-child),
  td:not(:first-child) {
    text-align: center;
  }

  @media screen and (max-width: 768px) {
    .mainNav {
      width: 100%;
    }
  }
`;
