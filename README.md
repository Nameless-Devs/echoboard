# Echoboard

**[EchoBoard](https://app.echoboard.site/home) is a platform designed to address the challenge of effectively sharing and solving problems within the workplace. 
It aims to bridge the gap between employees and upper management by providing a platform for employees to voice their concerns, propose solutions, and collaborate on addressing issues that impact the organisation.**

#

**The Problem**
- Employees often encounter various challenges and obstacles during their work, and they may possess valuable insights and solutions to these problems. However, there is often no organised platform for employees to share their concerns and suggestions, leading to missed opportunities for improvement. Additionally, upper management may lack awareness of the extent of these challenges faced by employees. 
- EchoBoard aims to tackle these issues by providing a platform that facilitates open communication, collaboration, and problem-solving within the organisation.

**The Solution**
- EchoBoard serves as a centralised platform that encourages employees to voice their problems, propose solutions, and collaborate on addressing issues. The core features of the solution include:
	- Problem Visibility: 
		- Employees can upload their problems to the platform, providing visibility to the challenges they encounter in their roles.
	- Voting and Priority: 
		- Other employees can upvote problems to indicate their level of concern, helping to prioritise issues that require attention.
	- Collaboration: 
		- The platform fosters collaboration within and across teams by enabling discussions around the identified problems and potential solutions.
	- Testing Solutions: 
		- Proposed solutions can be voted on and tested by volunteer employees, allowing for practical evaluation and refinement.
	- Solution Labels: 
		- Solutions are categorised with labels such as "being tested," "tested and failed," "tested and succeeded," and "needs volunteers," providing clarity on their status.
	- Problem Resolution: 
		- If a solution is tested successfully, the associated problem is marked as solved and archived for reference.


**Pitch Deck**  
[![Pitch deck video](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/17zv-aNRXUQ?si=ifBuImKbhevp0ihR)

#

### 📱 Tech Stack
![Java](https://img.shields.io/badge/Java-6F4E37?style=for-the-badge&logo=java&logoColor=white)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![DynamoDB](https://img.shields.io/badge/DynamoDB-4053D6?style=for-the-badge&logo=amazon-dynamodb&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React.ts](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

#

**Minimum Viable Product (MVP)**
- The EchoBoard MVP includes the following features:
    - Employees can submit problems.
    - Problems can be upvoted to indicate priority.
    - Commenting on problems is allowed.
    - Employees can propose solutions for problems.
    - Solutions are labeled with their status.
    - Successful solutions mark associated problems as solved.

<p align="center">
<img width="658" alt="Screenshot 2023-09-05 at 11 47 12" src="https://github.com/Nameless-Devs/echoboard/assets/125829513/d2cee98b-142a-470f-97c4-f3e4ee6ba119">
</p>

<details>
<summary><strong>Extra features and ideas</strong></summary>
    
- Archive and Current Sections: 
    - Organize problems and solutions into archived and current sections for easy reference.
- User-Generated Content Management: 
    - Allow users to update or delete their submitted problems and solutions.
- Authentication and Authorization:
    - Implement a login system to ensure the security and privacy of user data.
- Slack Integration: 
    - Integrate with Slack to enable messaging capabilities and streamline communication.
- Rewards and Recognition: 
    - Introduce a reward system to incentivize employees for their contributions to problem-solving.
- Google Tasks Integration: 
    - Connect with Google Tasks to assign and manage tasks related to problem-solving.
</details>


#

**Conclusion**
- EchoBoard aims to empower employees by providing a platform for sharing challenges, proposing solutions, and collaborating on problem-solving efforts. By embracing technology and open communication, EchoBoard has the potential to foster a culture of innovation and continuous improvement within your organisation.
#  

### Weekly Sprint result videos
**Week 1:** [![Week 1](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/JhUpzNYnvzo?si=iRZY_Q1q3FMGLS8X)  
**Week 2:** [![Week 2](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/qr2D3bSNd78?si=0IqkzBUAO9xkli91)  
**Week 3:** [![Week 3](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/PDs0mfecejo?si=nPDCwoK5u0de6NP0)  
**Week 4:** [![Week 4](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/hcqsbh3kdII?si=u6RiLA5WqnOkoPdY)  
**Week 5:** [![Week 5](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/o9SIcRQ68fY?si=Pg4NmJm8K_QhnWyS)   
**Week 6:** [![Week 6](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/cdqUh1Uf_uc)   
**Week 7:** [![Week 7](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtu.be/o8cCEqW_Zto) 


#


### 🚀 Getting Started / Installation
Follow these steps to get the application up and running in your local environment (you will be only able to run the applicatio in dev mode):

1. Clone the repo SSH
``` git clone git@github.com:Nameless-Devs/echoboard.git ```

| Steps                            | Front-end                 | Back-end                  |
| ---------------------------------| ------------------------- | ------------------------- |
| 2. Navigate into repo            | `cd Client`               | `Inside echoboard`        |
| 3. Install Dependencies          | `npm install`             | `mvn clean install`       |

4. Go to your application-dev.yml in resource folder an replace these values: 

`url: ${DATABASE_URL_DEV}`  
`username: ${DATABASE_USER}`  
`password: ${DATABASE_PASSWORD}`

With these values: 

`url: jdbc:h2:mem:testdb`  
`username: sa`  
`password:`  (Should be empty)

It will allow you to run the application in **dev mode**.
| Steps                            | Front-end                 | Back-end                  |
| ---------------------------------| ------------------------- | ------------------------- |
| 5. Run the project               | `npm run dev`             | `mvn start`               |



#

### 📧 Contact Information

| Contributors           | Socials |
| ----------------------- | ------- |
| Nate Arafayne           | [![Github-Nate](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/NateAra) [![LinkedIn-Nate](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nate-tklay-arafayne-20898925a/) |
| Anastasia Kurayshevich  | [![Github-Anastasia](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AnastasiaKurayshevich) [![LinkedIn-Anastasia](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/anastasia-kurayshevich/) |
| Ibrahim Iqbal           | [![Github-Ibrahim](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dIB59) [![LinkedIn-Ibrahim](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ibrahim-iqbal-34a5b617a/) |

#  

Visit our deployed application [here](https://app.echoboard.site/home).
#

[![tests](https://github.com/Nameless-Devs/echoboard/actions/workflows/tests.yaml/badge.svg)](https://github.com/Nameless-Devs/echoboard/actions/workflows/tests.yaml)


