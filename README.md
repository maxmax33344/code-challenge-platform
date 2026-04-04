
**Assessment 1.2 (Total Marks **20**)**

Assignment: **Software requirements analysis and design (**Full-Stack CRUD Application Development with DevOps Practices**)**


---

**Objective**

For this assessment, you have already been assigned a project. Your task is to develop a system that implements CRUD (Create, Read, Update, Delete) operations based on the selected project. The system should include both a user panel and an admin panel. Depending on the nature of your chosen project, you may decide how many CRUD operations are required to support the functionality of the system. You have been provided with a starter project that includes user authentication using Node.js, React.js, and MongoDB, your should extend this application based on your assigned project requirements. Ensure that the implemented features are appropriate and meaningful for your selected project. Your project should include the following:
In this assignment you will complete the following tasks:

* **Basic Version Control using GitHub**
* **Development, CI/CD Integration for Automated Deployment**
* **Project report**

 
---

**Implementation**
In this code implementation, I have implemented basic CRUD operations for the code challenge section. Hide is an extra operation implemented, challenge cant be read by user but still exist in database. (admin can read the hidden challenge)
- Create Challenge (admin only)
- Read Challenge (user and admin)
    - user can only read released challenge
- Update Challenge (admin only)
- Delete Challenge (admin only)
- Hide Challenge (admin only)

Backend Development
- Set up database connection
- Set up backend APIs for CRUD operations + hide functionality.
- Set up backend routes for CRUD operations + hide functionality.
- Backend testing

Frontend Development
- Set up components ChallengeForm.jsx, ChallengeList.jsx, ChallengeView.jsx, Navbar.jsx
- Modify CSS elements to implement chosen color palette
- Set up pages Challenges.jsx, Login.jsx, Register.jsx
- Set up frontend routes

Authentication & Authorisation
- Set up user and admin role
- Set up persistent login functionality(No longer autologoff after refresh)
- Set up input validation and sanitization for register and login function

CI/CD pipeline setup
- CI.yml implemented
- Github action runner setup
- pm2 configured.
- backend testing implemented.

---

**TO-DO implementation**
Due to limited timeframe given to develop this project, a portions of requirments specified in my system requirment report are not implemented.

- Code editor for user
- Code submission functionality
- Submission unit test validation
- Support tikcet system
- User ranking system.

**Requirement**
Node.js version 22.22.2
---

**Important Information for testing**
Due to AWS EC2 limitations, the EC2 instance are very prone to break. These are requirements must be met to suscessfully running the project.
- Public IP: Everytime AWS EC2 instance restart, a different public IP address would be given. The report's public address will not match a newly started instance public IP address.
    - Must modify axiosConfig.jsx to change live baseURL
- Security rules: Must create new inbound rules with myIP and ports 3000 and 5001
- AWS EC2 instance: In current implementation, pm2 service needs to be manually triggered after instance started with command pm2 resurrect. If pm2 resurrects fails, please do the following:
    - cd to backend directory
    - pm2 start "npm run start" --name="backend"
    - cd to frontend directory
    - yarn install
    - sudo rm ./build
    - yarn run build
    - pm2 serve build/ 3000 --name "Frontend" --spa
    - pm2 status (to confirm running status)

---

