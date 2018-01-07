# calculatorApi
This is a simple web service to implement a calculator.

Endpoint:
GET /calculus?query=[input]
Input should be UTF-8 with BASE64 encoding.
Supported operations are + - * / ( ).

Return:
    - On success:
      { error: false, result: number }
    - On error:
      { error: true, message: string }
