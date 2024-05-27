exports.styles = `
  .body {
    background-color: #145ED7;
    height: 100%;
  }

  .log {
    font-weight: bold;
  }

  .btn.btn-custom {
    background-color: #FFE000;
    color: #112568;
    font-weight: bold;
    border-radius: 100px;
  }

  .flag {
    width: auto;
    height: 30px;
    border-radius: 5px;
  }

  .mainNav {
    text-decoration: none;
    color: #999;
    width: 200px;
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
