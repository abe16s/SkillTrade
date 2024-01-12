# Web-Group-Project
Web Development Course Group Project 2023/24 G.C 

# Title
# SkillTrade Connect: Your Home Services Hub

# Group Members   
<pre>
    Name                           ID
1. Abenezer Seifu Dula          UGR/6499/14
2. Betsegaw Mesele Worku        UGR/9758/14
3. Biniyam Assefa Mekonnen      UGR/8320/14
4. Kaleb Asratemedhin Bekele    UGR/9104/14
</pre>

## How to run the project
After cloning the project
1. Go to the backend directory
<pre>cd backend</pre>

2. install all the dependencies
<pre>npm install</pre>

3. Open docker desktop and start the docker engine
4. Compose the database on docker
<pre>docker compose up dev-db -d</pre>

5. Migrate the database schema
<pre>npx prisma migrate dev</pre>

6. Start the backend server
<pre>npm run start:dev</pre>

7. Go to frontend directory and open the index.html file

#### Why we choose PostgreSQL 
i) PostgreSQL offers a wide range of advanced features, including support for complex queries, indexing, transactions, and foreign keys. It also supports various data types, including custom types and indexing mechanisms.
ii) PostgreSQL is designed to scale horizontally and vertically. It supports both read and write scaling strategies, making it suitable for a wide range of applications, from small projects to large enterprise-level systems.
iii) PostgreSQL is a relational database and relational databases enforce data integrity through features such as primary keys, foreign keys, and constraints. This ensures that data is accurate, consistent, and complies with the defined rules.

## Description of the website
This hub is designed to simplify the process of connecting skilled trade technicians with customers seeking home installation like Dish Network technician, Plumber, Carpenter, Electrician, Mason, Landscaper/Gardener, HVAC Technician, Roofing Contractor, Mechanic and etc to installation and maintenance services. It serves as a bridge between professionals adept in various technical skills and individuals in need of these services within their homes.

## How It Works
1.Create an Account(Both customers and technicians): Users sign up, providing necessary details and preferences.
2.Browse Technicians: Cutomers search for technicians based on required skills and availability.
3.Book an Appointment: Select a suitable time slot and confirm the service request.
4.Track Service Status: Monitor the progress of the appointment and stay updated on the technician's arrival.

# Features
## Technician Profiles
Comprehensive Profiles: Technicians create profiles showcasing their expertise, experience, and certifications.
Skill Sets: Users can browse technicians based on their specific skills (plumbing, electrical work, carpentry, etc.).

## Booking System
Appointment Scheduling: Customers can easily book appointments with technicians based on their availability.
Flexible Scheduling: Options for same-day or future appointments to cater to immediate needs or plan ahead.

## Service Tracking
Job Status Updates: Customers can track the status of their service request from booking to completion.

## Benefits
Efficiency: Streamlined process for finding skilled technicians quickly.
Convenience: Easy booking and tracking of services from the comfort of home.

## Roles
1.Technicians: These are the skilled professionals who offer their services through the platform. They could be plumbers, electricians, HVAC technicians, carpenters, mechanics, or experts in various other trades. Their role involves creating profiles showcasing their skills, expertise, availability, and accepting service requests from customers. They perform the requested services at the customers' homes.

2.Customers: These are the individuals or households seeking home maintenance or installation services. Customers use the platform to search for technicians based on their specific needs, schedule appointments, track service requests. They book appointments with technicians to address their home-related technical issues or installation needs.

## CRUD 
### Customers
1. Create - Account, Booking
2. Read - Technicians, Booking
3. Update - Account, Booking
4. Delete - Booking

### Technicians
1.Create - Profile
2.Read - Booking
3.Update - Booking

## Conclusion
This platform aims to revolutionize the way home services are sought and provided, ensuring a hassle-free experience for both technicians and customers. By facilitating efficient connections and transparent transactions, it strives to create a reliable and trustworthy ecosystem for home maintenance and installations.
