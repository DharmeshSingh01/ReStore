using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  
    public class BuggyController : BaseAPIController
    {
        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();
        }
        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            
            //return BadRequest("This is Bad Request📛");
            return BadRequest(new ProblemDetails { Title = "This a Bad Request" });
        }
        [HttpGet("unauthorise")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }
        [HttpGet("validation-error")]
        public ActionResult GetValidationError()
        {
            ModelState.AddModelError("Problem1", "this is first Error");
            ModelState.AddModelError("Problem2", "this is second Error");
            return ValidationProblem();
        }
        [HttpGet("server-error")]
        public ActionResult GetServerError() { 
            throw new Exception("This is server error");
        }
    }
}
