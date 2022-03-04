<body id="top">

[//]: # 'NOTE: Link reference chart can be found at the bottom of this document'

&nbsp;

# **Contribution Guidelines**

Welcome to the Galleon DAO! We are excited that you are looking to contribute in the DeFi world and help others achieve financial freedom. Here at Galleon DAO, there are a variety of avenues for you to consider depending on your knowledge and experience in the world. Below you will find a collection of guidelines that we use to help everyone find their niche within our growing community.

<body id="table-of-contents"> &nbsp;

## **Table of Contents**

- ### [**Code of Conduct**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#-code-of-conduct)

- ### [**General Information**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#-general-information)

  - [**Your Contribution to Galleon DAO**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#your-contribution-to-the-galleon-coop)

- ### [**Getting Started**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#-getting-started)

  - [**Choosing Your Platform**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#choosing-your-platform)
  - [**Understanding Forks**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#understanding-forks)
  - [**Understanding Branches**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#understanding-branches)

- ### [**Technical Resources**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#-technical-resources)

  - [**Installing Dependencies**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#installing-dependencies)
  - [**Coding Conventions**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#coding-conventions)
  - [**Coding Comments**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#coding-comments)
  - [**Coding Documentation**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#coding-documentation)

- ### [**Issues**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#-issues)

  - [**Filing an Issue**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#filing-an-issue)
  - [**Bug Reports**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#bug-reports)
  - [**Feature Requests**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#feature-requests)
  - [**Labeling Issues**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#labeling-issues)
  - [**Resolving Issues**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#resolving-an-issue)

- ### [**Pull Requests**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#-pull-requests)

  - [**Step 1: Creating a Pull Request**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#step-1-creating-a-pull-request)
  - [**Step 2: Reviewing a Pull Request**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#step-2-reviewing-a-pull-request)
  - [**Step 3: Merging a Pull Request**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#step-3-merging-a-pull-request)

- ### [**Troubleshooting**](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#-troubleshooting)

&nbsp;

## <a href="#table-of-contents">↑</a> **Code of Conduct**

Galleon DAO is a project that exists through individual entities working together as a unified community. The community is governed by our [Code of Conduct][3], and any unnacceptable behavior encountered while working on the SetSwap UI should be reported to the `#development` channel in our [Discord][4].

&nbsp;

## <a href="#table-of-contents">↑</a> **General Information**

### **Please do not file an issue to ask a question!**

If you are looking for more information or need help getting answers, we have multiple outlets for you to consider:

- [Discord][4] - Join our Discord for community discussions, questions, ideas, or involvement in Galleon DAO.

  - The `#development` channel is home to the Engineering pod. The majority of development discussions take place here.

###### &nbsp;

- [SetSwap Website][5] - Visit our homepage to browse the products we offer and [learn more][6] about who we are. You can also:

  - [Read][60] about all things within the Galleon DAO community.
  - [Discover][61] how you can contribute.
  - [Become][62] one of our methodologists.
  - [Invest][63] in our products.
  - [Vote][9] on proposals.

###### &nbsp;

- [Forum][10] - Contribute to the ongoing growth of our collective through governance discussions concerning tokenomics, upcoming proposals, and community organization.

###### &nbsp;

&nbsp;

### **Your Contribution to Galleon DAO**

## <a href="#table-of-contents">↑</a> **Getting Started**

GitHub is structured in a way that allows us to manage `setswap-interface` through the use of forks from the original repository. When you want to begin working on a project for `setswap-interface`, the first thing you will need to do is create your own fork from the main that can be found at `GalleonDAO/setswap-interface`. If you are new to GitHub, then we recommend this [Quickstart guide][15] before getting started, or you can sharpen up your vocabulary skills by reviewing some commonly referenced terms in the [GitHub glossary][16].

&nbsp;

### **Choosing Your Platform**

There are a variety of ways to get work done for Galleon DAO through GitHub, whether you choose to use the [GitHub website][39] or [GitHub Desktop][40]. The desktop application functions as an all-in-one resource that is streamlined for GitHub related content, and while the website includes many similar features, complete functionaility is achieved by using the command line. Interacting with GitHub in this way will require you to become familiar with [Git][41], as the command line utilizes [Git Commands][42] for common tasks. You can install the appropriate Git package for your machine [here][44]. If you find yourself confused amidst the multitude of Git commands, then you can check out this [comprehensive guide][51] that features detailed descriptions of each command and the part they play in the GitHub Working Tree.

As for coding software, feel free to use your favorite platform! Many of our developers use [Visual Studio Code][43], so if you are looking to maintain some consistency by installing many of the same extensions used by others in our community, then simply ask for recommendations in the `#development` channel of our [Discord][4].

&nbsp;

### **Understanding Forks**

Creating your own fork allows you to make a copy of the original repository that will exist as a separate entity from the main. The new clone can fetch upstream for updates that have occurred since the creation of your fork or submit changes for review before merging with the main repository. When you create a fork from `GalleonDAO/setswap-interface`, your new branch will look like this:

&nbsp;

> ### `yourName/setswap-interface`
>
> ##### forked from `GalleonDAO/setswap-interface`

&nbsp;

Depending on your circumstances, you may want to keep your fork in [sync][36] with the main at `GalleonDAO/setswap-interface`. The process requires a brief [setup][38] through the command line, but it can prevent future problems associated with unsynced commits between the two repositories when you attempt to merge your commits with the main. Alternatively, you can always perform a manual [fetch upstream][37] command from the web application. If you would like a more comprehensive understanding of everything related to forks, you can find that [here][17].

&nbsp;

### **Understanding Branches**

Within your own forked version of the main repository, you are able to create and label separate [branches][34] for distinct purposes. Branches allow you to work on specific projects in isolation from any other work you may be doing in other files or folders. [Creating a branch][35] is simple, and it is **highly recommended** that you create a separate branch for each individual project that you begin. This will keep all of your work consolidated within an isolated environment, which will make troubleshooting much easier by reducing the amount of variables involved across your repository.

&nbsp;

### **Installing Dependencies**

Since `setswap-interface` is the front-end we use to interact with our products, you will also need to install the necessary dependencies for your project to function correctly. In order to run the commands, make sure that you have already installed [Node.js][59] on your machine. After installing Node.js, you can simply run `npm install -g yarn` to install yarn, and follow [these steps][18] to set up your own local version of `setswap-interface` .

&nbsp;

### **Coding Conventions**

While we don't necessarily require you to follow a strict set of rules, we **highly recommend** the use of [Prettier][19] in order to keep the formatting of your code clean and uniform. The benefit of this approach is that we can help our developers maintain their sanity as they troubleshoot bugs or review the coding for new features. Additionally, it makes future adjustments to the code much less time consuming when there is some consistency across all of the features added to `setswap-interface`.

&nbsp;

### **Coding Comments**

A good habit to develop early on is to include some simple comments within your code so that anyone who views your code (including your future self) can gather a brief summary of what is being viewed without spending an inordinate amount of time studying the syntax in order to understand it's functionality. As a general rule:

**&nbsp; &nbsp; ➞ &nbsp; comments &nbsp; ≠ &nbsp; documentation**

**Commenting is mostly for clarification**, while documentation helps to define the underlying purpose for the code. In order to prevent clutter within your code, try to employ the use of clever naming conventions that inherently describe the processes involved within their nomenclature, rather than relying upon blocks of comments for clarity. Ultimately, discernment is the key to effective commenting, so if you'd like to read up more on the use of comments within code, you can do so [here][23].

&nbsp;

### **Coding Documentation**

Typically, **documentation is an external resource** that provides an explanation of your code and the purpose it serves to everyone involved with the project. You could consider these Contribution Guidelines to be a form of documentation, as they are a publicly accessible compilation of standards that are pertinent to the development and growth of `setswap-interface`.

At Galleon DAO, we are a community-driven project, and proper documentation is essential for the ongoing growth of our project within the DeFi world. If you are interested in learning more about the various ways in which documentation is useful for us, we can direct you to this [Beginner's Guide][24] or [these tips][25] to simplify the process of documenting your work.

&nbsp;

## <a href="#table-of-contents">↑</a> **Issues**

#### **☞ ☞ REMINDER ☜ ☜**

**Please do not file an issue to ask a [question!](https://github.com/GalleonDAO/setswap-interface/blob/main/CONTRIBUTING.md#please-do-not-file-an-issue-to-ask-a-question)**

[Issues][20] are an organized way of keeping track of work being done on bug reports and feature requests for `setswap-interface`. Each issue should have the following aspects in order to maintain consistency and reduce confusion:

&nbsp;

[//]: # 'Zoom out or reduce font size to view table'

| Type            | Description                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Title**       | Briefly summarize the issue.                                                                                                                       |
| **Description** | An adequate explanation of what is needed and/or requested.                                                                                        |
| **Labels**      | Color-coded labels help to categorize issues according to type or difficulty.                                                                      |
| **Assignee**    | Adding an assignee to a particular task helps to avoid miscommunication and prevent multiple people from working on the same issue simultaneously. |
| **Comments**    | Each issue has a comment thread for claiming an issue and following up for additional information from the original author.                        |

&nbsp;

### **Filing an Issue**

**Before you file an issue, please check to make sure a similar issue has not already been filed.** If a previous issue was indeed filed but never resolved, take note of the date the issue was created. It is perfectly acceptable to comment on the issue to track its progress, but remember to use reasonable discretion and allow the assignee time to resolve the issue. If you would like to read further into GitHub Issues and when to use them, you can do so [here][30].

There are two primary templates used when filing an issue, so be sure to distinguish between a [bug report][21] and a [feature request][22].

&nbsp;

#### **Bug Reports**

- Provide evidence of a demonstratable and reproducible bug.
- Explain the steps that produced the bug with precise detail in order to isolate the issue.
- Supply a specific block of code that is being problematic and ask for help with troubleshooting.
- Feel free to include images or GIFs if they help to demonstrate the bug.

&nbsp;

#### **Feature Requests**

- Provide a clear, step-by-step description of the enhancement you envision.
- Describe the current behavior and detail why a feature request would enhance future behvior.
- Include any guidelines or parameters necessary for working on the project.
- Feel free to include images or GIFs if they help to showcase your vision and assist in developing a new feature.

&nbsp;

### **Labeling Issues**

A great way for the Galleon DAO to continue growing is by granting newcomers with the ability to perform basic tasks to establish a footprint within our community. Providing these opportunities for newcomers is crucial to the ongoing development of our product and makes our DeFi movement even more sustainable and future-proof. If a project has a need for some simple work to be done that could be performed by a newcomer, then we encourage you to create a separate issue with the `crew-swab` label attached.

You will also notice a variety of other labels available for tagging Issues, but the ones that tend to be the most common are the `bug` and `enhancement` labels.

&nbsp;

### **Resolving an Issue**

After you have been assigned to a project and completed some or all of the necessary work involved, you will need to begin the process of resolving the issue. Within the isolated branch you have created and named in accordance with the issue you are resolving, check to be sure that your repository is up-to-date with the main at `GalleonDAO-setswap-interface`. [Upload][45] the necessary files, and do your best to give them an appropriate name signifying their purpose, function, or relation to a particular project.

Once you are ready to proceed, you will need to [commit][46] the changes to your local repository. Commits save a snapshot of your repository and the changes made at a particular time, so feel free to perform multiple commits if necessary as you work through your project. When you feel that your work is complete and capable of being reviewed, you will need to [push][47] your commits upstream to the main. Once your files have been successfully pushed, you will be ready to link a pull request to your branch and submit your project for review.

&nbsp;

## <a href="#table-of-contents">↑</a> **Pull Requests**

[Pull Requests][31] (often referred to as 'PRs') are the means by which the files that have been edited or updated within your fork are merged into the main repository at `GalleonDAO/setswap-interface`. We have created a [template](https://github.com/GalleonDAO/setswap-interface/blob/main/.github/pull_request_template.md) to make the general formatting easier for our contributors and maintainers, but there are different stages to PRs, so be sure to familiarize yourself with the individual steps of the process.

&nbsp;

### **Step 1: Creating a Pull Request**

[Creating a pull request][32] is extremely simple, but you must first decide whether you need to open a **draft** or a request that is **ready for review**. A [draft][48] simply initiates the pull request process, but draft requests cannot be reviewed or merged with the main. You might consider opening a draft request first and double-checking that the branch you are attempting to merge contains all of the necessary files for your project. When you are certain that you want your project to be merged with the main, then you can [change the stage][49] of your draft and request for it to be [reviewed][54] for a potential merger.

You might also consider [linking][52] a PR to a particular issue so that it is automatically resolved once the review process is finalized and your work is merged into the main. GitHub recognizes keywords when initiating PRs, so a common phrase used to link to an issue is simply:

> "This should resolve issue #0123"

&nbsp;

### **Step 2: Reviewing a Pull Request**

The actual merge will not be finalized until the request is [reviewed][50] by one of our developers with administrative write permissions. In the meantime, be sure to check your PR for comments containing suggestions or questions from our admins concerning your project. If one of our admins requests changes to be made, then you will need to edit your files and [upload][53] them within the conversation contained within your submitted PR. Be sure to provide as much specific detail as possible when interacting with admins in order to expedite the process and clarify the reasoning behind the decisions you made.

&nbsp;

### **Step 3: Merging a Pull Request**

After you have resolved any discussions concerning your project, our admins will verify that your PR is able to be [merged][55] with the main. This step requires administrative write capabilites to be performed, so you will not have to do anything other than wait for the merge to occur. Beyond this step, the only thing we encourage our contributors to do is put forth a diligent effort to maintain their projects and provide support as needed in the event that bugs appear or enhancements are recommended.

&nbsp;

## <a href="#table-of-contents">↑</a> **Troubleshooting**

If you are experiencing problems or difficulty with the GitHub interface as it pertains to Galleon DAO related content, then please direct all questions to the `#dev` channel in our [Discord][4]. All other basic, non-technical questions can be asked in the `#help` channel.

Some general troubleshooting guidelines to consider:

- Always proofread your content.
- Maintain a consistent coding standard throughout your projects.
- Read and re-read your code to check for messy syntax or broken logic.
- Refactor when necessary to clean up dense code blocks and simplify naming schemes.
- Utilize an effective linter to assist with proper formatting.
- Search for potential solutions on other coding forums.
- Breathe. Work on something else for a while, and revisit the problem with refreshed determination.

#

<a href="#top">↑ Back to top</a>

&nbsp;

[//]: # 'Below is a link reference chart for links used in this file'
[//]: # 'Zoom out or decrease font size to view link reference chart'
[2]: https://docs.galleon.community/ 'Galleon documentation'
[3]: https://github.com/GalleonDAO/setswap-interface/blob/main/CODE_OF_CONDUCT.md/ 'code of conduct'
[4]: https://discord.gg/galleondao 'galleon discord'
[5]: https://www.galleon.community/ 'galleon website'
[8]: https://www.galleon.community/liquidity-mining 'galleon liquidity'
[9]: https://snapshot.org/#/galleondao.eth 'galleon vote'
[10]: https://gov.galleon.community/ 'galleon forum'
[14]: https://twitter.com/galleondao 'galleon twitter'
[15]: https://docs.github.com/en/github/getting-started-with-github/quickstart 'github quickstart'
[16]: https://docs.github.com/en/github/getting-started-with-github/github-glossary 'github glossary'
[17]: https://docs.github.com/en/github/getting-started-with-github/fork-a-repo 'github forks'
[18]: https://github.com/GalleonDAO/setswap-interface/blob/main/README.md 'galleon readme'
[19]: https://prettier.io/ 'prettier website'
[20]: https://github.com/GalleonDAO/setswap-interface/issues 'galleon issues'
[21]: https://github.com/GalleonDAO/setswap-interface/blob/main/.github/ISSUE_TEMPLATE/bug_report.md 'bug report'
[22]: https://github.com/GalleonDAO/setswap-interface/blob/main/.github/ISSUE_TEMPLATE/feature_request.md 'feature request'
[23]: https://www.freecodecamp.org/news/code-comments-the-good-the-bad-and-the-ugly-be9cc65fbf83/ 'code comments'
[24]: https://blog.submain.com/code-documentation-the-complete-beginners-guide/ 'code documentation'
[25]: https://blog.submain.com/simplifying-code-documentation/ 'simple documentation'
[29]: https://docs.galleon.community/working-groups/working-groups-101 'working groups'
[30]: https://guides.github.com/features/issues/ 'github issues'
[31]: https://github.com/GalleonDAO/setswap-interface/pulls 'galleon pull requests'
[32]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork 'create pull request'
[33]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests#draft-pull-requests 'draft pull request'
[34]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-branches 'github branches'
[35]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository 'create branches'
[36]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork 'github sync'
[37]: https://ardalis.com/github-fetch-upstream/ 'github fetch upstream'
[38]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork 'github setup git'
[39]: https://github.com/ 'github website'
[40]: https://desktop.github.com/ 'github desktop'
[41]: https://docs.github.com/en/github/getting-started-with-github/getting-started-with-git 'git started'
[42]: https://docs.github.com/en/github/getting-started-with-github/using-git 'using git'
[43]: https://code.visualstudio.com/ 'visual studio code'
[44]: https://github.com/git-guides/install-git 'git install'
[45]: https://docs.github.com/en/github/managing-files-in-a-repository/adding-a-file-to-a-repository 'gitub upload file'
[46]: https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/committing-and-reviewing-changes-to-your-project 'github commit'
[47]: https://docs.github.com/en/github/getting-started-with-github/pushing-commits-to-a-remote-repository 'github push'
[48]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests#draft-pull-requests 'github draft request'
[49]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/changing-the-stage-of-a-pull-request#marking-a-pull-request-as-ready-for-review 'github change the stage'
[50]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-request-reviews 'github review'
[51]: https://medium.com/mindorks/what-is-git-commit-push-pull-log-aliases-fetch-config-clone-56bc52a3601c 'github comprehensive guide'
[52]: https://docs.github.com/en/github/managing-your-work-on-github/linking-a-pull-request-to-an-issue 'github link PR'
[53]: https://docs.github.com/en/github/managing-your-work-on-github/file-attachments-on-issues-and-pull-requests 'github upload files for review'
[54]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/requesting-a-pull-request-review 'github request a review'
[55]: https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/merging-a-pull-request 'github merging a PR'
[59]: https://nodejs.org/en/download/ 'node.js installation'
[63]: https://setswap.xyz/ 'galleon invest'
