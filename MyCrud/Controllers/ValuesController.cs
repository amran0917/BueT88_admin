using Microsoft.Ajax.Utilities;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyCrud.Controllers
{
    public class ValuesController : ApiController
    {
        //var configs = new List<JObject>();
        // GET api/values
        [HttpGet]

        [Route("api/values")]
        public IHttpActionResult Get()
        {
            
    
    
            var configs = new List<JObject>();
            var config1 = "{ Id: 1, Name: 'Ahsanullah Hall', AddedOn: '04/10/2013'}";
            var config2 = "{ Id: 2, Name: 'Ladies Hall', AddedOn: '04/10/2014'}";
            var config3 = "{ Id: 3, Name: 'Nazrul Islam Hall', AddedOn: '05/10/2014'}";
            var config4 = "{ Id: 4, Name: 'Shahid Smiriti Hall', AddedOn: '04/12/2017'}";
            var config5 = "{ Id: 5, Name: 'Shorowardi hall', AddedOn: '04/10/2019'}";
            var config6 = "{ Id: 6, Name: 'zia hall', AddedOn: '04/10/2020'}";






            JObject json1 = JObject.Parse(config1);
            JObject json2 = JObject.Parse(config2);
            JObject json3 = JObject.Parse(config3);
            JObject json4 = JObject.Parse(config4);
            JObject json5 = JObject.Parse(config5);
            JObject json6 = JObject.Parse(config6);



            configs.Add(json1);
            configs.Add(json2);
            configs.Add(json3);
            configs.Add(json4);
            configs.Add(json5);
            configs.Add(json6);


            return Ok(configs);
        }

        [HttpGet]
        [Route("api/configs")]
        public IHttpActionResult GetConf()
        {
            var configs = new List<JObject>();
            var config1 = " { name: 'Id'}";
            var config2 = "{name: 'Name'}";
            var config3 = "{name: 'AddedOn'}";
            var config4 = " {name: 'Action'}";

            JObject json1 = JObject.Parse(config1);
            JObject json2 = JObject.Parse(config2);
            JObject json3 = JObject.Parse(config3);
            JObject json4 = JObject.Parse(config4);

            configs.Add(json1);
            configs.Add(json2);
            configs.Add(json3);
            configs.Add(json4);
            return Ok(configs);


            //var configs = new List<JObject>();
            //var config1 = "{label: 'StudentName',name: 'name',type: 'input'}";
            //var config2 = "{label: 'Select University',name: 'univesity',type: 'select',  options: 'api/values/dropdown',value: 'DU'}";
            //var config3 = "{label: 'Gender',name: 'gender',type: 'radiobutton', options: 'api/values/radiobutton',value: ''}";





            //JObject json1 = JObject.Parse(config1);
            //JObject json2 = JObject.Parse(config2);
            //JObject json3 = JObject.Parse(config3);

            //configs.Add(json1);
            //configs.Add(json2);
            //configs.Add(json3);

            //return Ok(configs);
        }

        [HttpGet]
        [Route("api/configs2")]
        public IHttpActionResult GetConf2()
        {
            var configs = new List<JObject>();
            var config1 = " { name: 'Id'}";
            var config6 = "{name: 'Image'}";
            var config2 = "{name: 'Name'}";
            var config3 = "{name: 'MemberAddedOn'}";
            var config4 = " {name: 'Department'}";
            var config5 = " {name: 'Action'}";

            JObject json1 = JObject.Parse(config1);
            JObject json6 = JObject.Parse(config6);

            JObject json2 = JObject.Parse(config2);
            JObject json3 = JObject.Parse(config3);
            JObject json4 = JObject.Parse(config4);
            JObject json5 = JObject.Parse(config5);


            configs.Add(json1);
            configs.Add(json6);
            configs.Add(json2);
            configs.Add(json3);
            configs.Add(json4);
            configs.Add(json5);

            return Ok(configs);


        }

        [HttpGet]
        [Route("api/values2")]
        public IHttpActionResult GetValue2()
        {

            var configs = new List<JObject>();
            var config1 = "{ Id: 1,Image:'https://localhost:44342/Resources/Images/client-1.jpg', Name: 'Ahsanullah', MemberAddedOn: '04/10/2013', Department: 'CSE'}";
            var config2 = "{ Id: 2,Image:'https://localhost:44342/Resources/Images/client-2.jpg', Name: 'SehjanUllah', MemberAddedOn: '04/10/2014', Department: 'Architecture'}";
            var config3 = "{ Id: 3,Image:'https://localhost:44342/Resources/Images/team-1.jpg', Name: 'SanaUllah', MemberAddedOn: '04/10/2019', Department: 'Civil'}";
       
            JObject json1 = JObject.Parse(config1);
            JObject json2 = JObject.Parse(config2);
            JObject json3 = JObject.Parse(config3);
           
            configs.Add(json1);
            configs.Add(json2);
            configs.Add(json3);
           


            return Ok(configs);
        }


        [HttpGet]
        [Route("api/events")]
        public IHttpActionResult GetEvents()
        {

            var configs = new List<JObject>();
            var config1 = "{ Id: 1,Image:'https://localhost:44342/Resources/Images/DEpt_of_Architecture.jpg', Event: '2015 :Cotribution for Kidney treatment to Golam Faruk Patawary, ME', Date: '04/10/2013'}";
            var config2 = "{ Id: 2,Image:'https://localhost:44342/Resources/Images/IMG_14.jpg', Event: '2019 : Death of Abrar Fahad in Hall', Date: '04/10/2014'}";
   

            JObject json1 = JObject.Parse(config1);
            JObject json2 = JObject.Parse(config2);

            configs.Add(json1);
            configs.Add(json2);

           return Ok(configs);
        }

        [HttpGet]
        [Route("api/values/dropdown")]

        public IHttpActionResult DropDown()
        {
            var sr = new List<String>()
            {
                "Du", "RU", "CU", "Buet"
            };
            return Ok(sr);
        }
        [HttpGet]
        [Route("api/values/radiobutton")]
        public IHttpActionResult RadioButton()
        {
            var maramari = new List<String>()
            {
                "Male","Female"
            };
            return Ok(maramari);
        }




        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
