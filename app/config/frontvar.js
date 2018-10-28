
/*
 * Varibles which goes into frontend, e.g. Angular 5+.
 * Must be included in /dist/index.html
 <!-- load global vars -->
 <script>
    window.frontvar = {
        api_base_url : '<%= frontvar.api_base_url %>',
        api_base_path : '<%= frontvar.api_base_path %>',
    }
 </script>
 * This file must be inside .gitignore.
 * This file should be manually created after installation.
 */

var frontvar = {
    api_base_url: process.env.FRONTVAR_API_BASE_URL || 'http://localhost:3001',
    api_base_path: '/api'
};

module.exports = frontvar;

