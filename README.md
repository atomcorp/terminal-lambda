# Terminal Lambda

A couple of lambdas and a terraform for handling the windows terminal themes get and serve themes methods.

**getThemes** uses the GitHub API to get the themes then compiles them into a JSON file and adds them to an S3 bucket. **serveThemese** handles requests for the JSON file, getting them from the S3 bucket and passing it to the response.
