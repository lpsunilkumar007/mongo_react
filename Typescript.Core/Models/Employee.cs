namespace Typescript.Core.Models
{
    public class Employee
    {
        //[BsonId]
        //[BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string LastSalary { get; set; }
        public DateTime DateOfJoining  { get; set; }
        public DateTime DOB  { get; set; }
    }
}
