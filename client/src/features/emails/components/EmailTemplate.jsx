import './styles/style.css'
import WelcomeEmail from './welcomeEmail';

function EmailTemplate() {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Welcome to our family</title>

      </head>

      <body>
        <table
          className="body"
          role="presentation"
          border="0"
          cellPadding="0"
          cellSpacing="0"
        >
          <tbody>
            <tr>
              <td />

              <td className="container">
                <div className="content">
                  <table
                    className="main"
                    role="presentation"
                    border="0"
                    cellPadding="0"
                    cellSpacing="0"
                  >
                    <tbody>
                      <tr>
                        <td className="wrapper">
                          <table
                            role="presentation"
                            border="0"
                            cellPadding="0"
                            cellSpacing="0"
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <WelcomeEmail />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="footer">
                    <table
                      role="presentation"
                      border="0"
                      cellPadding="0"
                      cellSpacing="0"
                    >
                      <tbody>
                        <tr>
                          <td className="content-block">
                            <span className="apple-link">
                              Natours Inc, 123 Nowhere Road, San Francisco CA
                              99999
                            </span>
                            <br />
                            Don't like these emails? <a href="#">Unsubscribe</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>

              <td />
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

export default EmailTemplate;
