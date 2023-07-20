import React from "react";

const ErrorPage = () => {
    return (
        <div>
            {/* <%- include('./partials/header.ejs') %> */}
            <body>
                {/* <%- include("./partials/nav.ejs") %> */}
                <h1 class="error-text">Page not found! :(</h1>
                {/* <%- include('./partials/footer.ejs') %> */}
            </body>
        </div>
    )
}

export default ErrorPage;