# Blog_NodeExpress

Part 1:
1. Install NodeJS. Use npm to install express framework to your project folder.
2. Implement and run simple web-server which will always (any route, any request) return JSON of fixed blog article
object.
3. Extend web-server functionality from #2. Use Rest API to implement CRUD operations endpoints for blog articles.
You can log to console all operations until part 2. Use postman, or fiddler or other tool to test your endpoints.
Example of routes:
- GET /blogs
- GET /blogs/{id}
- POST /blogs
- PUT /blogs/{id}
- DELETE /blogs/{id}
4. Use any express view engine to return welcome page to user when accessing any route that server doesn’t
understand/not configured. This will replace implementation from #2.
*Advanced:
Use http://nodemon.io/ for development.
Add simple logging mechanism to write URL and Date info to file per each request (try
https://github.com/winstonjs/winston or any other library).