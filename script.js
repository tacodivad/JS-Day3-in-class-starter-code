const members = [
    {first_name:"John", last_name: "Doe", email:"johndoe@example.com", birthdate:"1999-12-31", salary:80000},
     {first_name:"Jane", last_name: "Smith", email:"janesmith@example.com", birthdate:"2015-09-01", salary:75000}
];



//OLD WAY DEMO - CONSTRUCTOR FUNCTION
// function Employee(firstName, lastName, email, birthdate, salary) {
//    this.firstName = firstName;
//    this.lastName = lastName;
//    this.email = email;
//     this.birthdate = birthdate;
//     this.salary = salary;
//  }

//   Employee.addEmployee = function(firstName, lastName, email, birthdate, salary) {
//    return new Employee(firstName, lastName, email, birthdate, salary);
//   };

//   Employee.prototype.editEmployee = function(updates) {
//     Object.assign(this, updates);
//   };

//   Usage example:
//   const bill = Employee.addEmployee("Bill", "Doe", "bill@example.com", "1990-01-01", 50000);
//   console.log(bill);

//   bill.editEmployee({ salary: 7777777, email: "xxxxxxx@example.com" });
//   console.log(bill);


// ----------------------------
// 1. CLASSES
// ----------------------------
//ES6 way - CLASSES - Create a new Employee class that adds a new employee and console logs them
// Goals:
// 1. Create a new Employee class with a constructor for Employee giving them a firstname, lastname, email, and birthdate

// Define a new class called Employee (modern ES6 syntax)
class Employee {
  // The constructor method runs automatically when we use "new Employee()"
  constructor(firstName, lastName, email, birthdate, salary) {
    this.firstName = firstName; // store the first name inside the object
    this.lastName = lastName;   // store the last name inside the object
    this.email = email;         // store the email address
    this.birthdate = birthdate; // store the birthdate
    this.salary = salary;       // store the salary amount
  }

  // Method to get a formatted string of all employee details
  getEmployee() {
    // Use template literals to combine fields into one readable string
    return `${this.firstName} ${this.lastName}, ${this.email}, ${this.birthdate}, Salary: $${this.salary}`;
  }

  // Method to edit/update employee information
  editEmployee(updates) {
    // Object.assign replaces existing values with the new ones in "updates"
    Object.assign(this, updates);
  }

  // Static method (called directly on the class, not an instance)
  static addEmployee(firstName, lastName, email, birthdate, salary) {
    // Return a new Employee object with the given values
    return new Employee(firstName, lastName, email, birthdate, salary);
  }
};

// Create a new employee object with my own information
const divad = new Employee("Divad", "Azuara", "divad@utexas.edu.com", "2003-09-26", 100000);

// Log the whole employee object to the console
console.log(divad);
// Log just the firstName property using dot notation
console.log(divad.firstName);
// Call the getEmployee() method to print all details in one string
console.log(divad.getEmployee());

// Create an array of multiple employees
const employeeList = [
  // First employee object
  new Employee("John", "Doe", "johndoe@example.com", "1999-12-31", 80000),
  // Second employee object
  new Employee("Jane", "Smith", "janesmith@example.com", "2015-09-01", 75000),
  // Include the "divad" object we created earlier
  divad
];

// Log the entire array to the console
console.log(employeeList);
// Log just Jane’s details using her object’s getEmployee() method
console.log(employeeList[1].getEmployee());

// Use the static addEmployee method to create another employee named Bill
const bill = Employee.addEmployee("Bill", "Turner", "bill@example.com", "1990-05-05", 90000);
// Log Bill’s details
console.log(bill.getEmployee());

// Function to display employees inside an HTML table
function renderEmployees(list) {
  // Find the <tbody> inside the #employeeTable element in the HTML
  const tableBody = document.querySelector("#employeeTable tbody");
  // If we can’t find the table (for example on another page), stop the function
  if (!tableBody) return;

  // Clear any existing rows before adding new ones
  tableBody.innerHTML = "";

  // Loop through the list of employees
  list.forEach(emp => {
    // Create a new table row for each employee
    const row = document.createElement("tr");
    // Add cells for first name, last name, email, and birthdate
    row.innerHTML = `
      <td>${emp.firstName}</td>
      <td>${emp.lastName}</td>
      <td>${emp.email}</td>
      <td>${emp.birthdate}</td>
    `;
    // Add the row into the table body
    tableBody.appendChild(row);
  });
}

// Call the renderEmployees function so employees show up in the HTML table
renderEmployees(employeeList);



// ----------------------------
// 2. CALLBACKS (pre-ES6 style)
// ----------------------------

// Function that checks payment using a callback
function verifyPaymentCallback(orderTotal, callback) {
  // Log that we are starting verification
  console.log(`Verifying payment of $${orderTotal}...`);

  // Simulate a delay (like waiting for a server) using setTimeout
  setTimeout(() => {
    // If order is less than 5000, call the callback with no error and a success message
    if (orderTotal < 5000) {
      callback(null, `Payment of $${orderTotal} verified successfully`);
    } else {
      // If order is 5000 or more, call the callback with an error message
      callback(`Payment of $${orderTotal} requires manager approval`, null);
    }
  }, 2000); // delay is 2000 milliseconds = 2 seconds
}

// Call verifyPaymentCallback with 3000 and provide a callback function
verifyPaymentCallback(3000, (error, success) => {
  // If error is not null, log it
  if (error) {
    console.log("Error:", error);
  } else {
    // Otherwise log the success message
    console.log("Success:", success);
  }
});

// Call verifyPaymentCallback with 6000 to trigger the error path
verifyPaymentCallback(6000, (error, success) => {
  if (error) {
    console.log("Error:", error);
  } else {
    console.log("Success:", success);
  }
});



// // ----------------------------
// // 3. PROMISES (ES6 style)
// // ----------------------------

// // Function that checks payment but returns a Promise instead of using callbacks
// function verifyPaymentPromise(orderTotal) {
//   // Log that we are starting verification
//   console.log(`Verifying payment of $${orderTotal}...`);

//   // Return a new Promise object
//   return new Promise((resolve, reject) => {
//     // Simulate async delay with setTimeout
//     setTimeout(() => {
//       // Resolve if order is less than 5000
//       if (orderTotal < 5000) {
//         resolve(`Payment of $${orderTotal} verified successfully`);
//       } else {
//         // Reject if order is 5000 or more
//         reject(`Payment of $${orderTotal} requires manager approval`);
//       }
//     }, 2000); 
//   });
// }

// // Call the promise function with 3000
// verifyPaymentPromise(3000)
//   .then(message => {
//     // .then runs if the promise was resolved
//     console.log("Success:", message);
//   })
//   .catch(error => {
//     // .catch runs if the promise was rejected
//     console.log("Error:", error);
//   });

// // Call the promise function with 6000
// verifyPaymentPromise(6000)
//   .then(message => {
//     console.log("Success:", message);
//   })
//   .catch(error => {
//     console.log("Error:", error);
//   });



// // ----------------------------
// // 4. ASYNC / AWAIT (ES8 style)
// // ----------------------------

// // Function that returns a promise (same logic as before)
// function verifyPaymentAsync(orderTotal) {
//   console.log(`Verifying payment of $${orderTotal}...`);

//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (orderTotal < 5000) {
//         resolve(`Payment of $${orderTotal} verified successfully`);
//       } else {
//         reject(`Payment of $${orderTotal} requires manager approval`);
//       }
//     }, 2000); 
//   });
// }

// // Async function lets us "wait" for the promise result
// async function handlePayments() {
//   try {
//     // Wait for the promise with order 3000
//     const result1 = await verifyPaymentAsync(3000);
//     console.log("Success:", result1);

//     // Wait for the promise with order 6000
//     const result2 = await verifyPaymentAsync(6000);
//     console.log("Success:", result2);
//   } catch (error) {
//     // If either call fails, handle the error here
//     console.log("Error:", error);
//   }
// }

// // Run the async function
// handlePayments();
