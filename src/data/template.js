const { ObjectId } = require('mongodb')

const managementTemplate = {
  title: 'Project Management Template',
  description: 'A comprehensive project management board template with common workflows',
  slug: 'project-management-template',
  type: 'public',
  columnOrderIds: [
    '670f1f1e1234567890abcde1',
    '670f1f1e1234567890abcde2',
    '670f1f1e1234567890abcde3',
    '670f1f1e1234567890abcde4'
  ], // Thêm các columnId
  ownerIds: [new ObjectId().toString()],
  memberIds: [],
  labelId: null,
  isTemplate: true,
  copyLength: 0,
  viewLength: 0,
  createdAt: Date.now(),
  updatedAt: null,
  _destroy: false,

  columns: [
    {
      columnId: '670f1f1e1234567890abcde1', // ID cố định
      boardId: 'board_001',
      title: '📋 Backlog',
      description: 'Tasks waiting to be started',
      cardOrderIds: ['670f1f1e1234567890abcdf1', '670f1f1e1234567890abcdf2'], // Thêm các cardId
      labelId: null,
      createdAt: Date.now(),
      updatedAt: null,
      _destroy: false,

      cards: [
        {
          cardId: '670f1f1e1234567890abcdf1', // ID cố định
          boardId: 'board_001',
          columnId: '670f1f1e1234567890abcde1',
          startDate: new Date('2024-08-25').getTime(),
          dueDate: new Date('2024-08-27').getTime(),
          title: 'Setup Project Repository',
          description: 'Initialize Git repository and setup basic project structure with README and documentation',
          isCompleted: false,
          attachments: [
            {
              attachmentId: new ObjectId().toString(),
              url: 'https://example.com/files/project-structure.pdf',
              name: 'project-structure.pdf',
              uploadedAt: Date.now()
            }
          ],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Initialize Git repository',
              isCompleted: true,
              createdAt: Date.now(),
              updatedAt: Date.now()
            },
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Setup folder structure',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            }
          ],
          labelId: null,
          cover: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400',
          memberIds: [new ObjectId().toString(), new ObjectId().toString()],
          comments: [],
          createdAt: Date.now(),
          updatedAt: null,
          _destroy: false
        },
        {
          cardId: '670f1f1e1234567890abcdf2', // ID cố định
          boardId: 'board_001',
          columnId: '670f1f1e1234567890abcde1',
          startDate: new Date('2024-08-26').getTime(),
          dueDate: new Date('2024-08-30').getTime(),
          title: 'Design System Architecture',
          description: 'Create high-level system architecture diagram and define component relationships',
          isCompleted: false,
          attachments: [],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Create architecture diagram',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            }
          ],
          labelId: null,
          cover: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
          memberIds: [new ObjectId().toString()],
          comments: [],
          createdAt: Date.now(),
          updatedAt: null,
          _destroy: false
        },
        {
          cardId: '670f1f1e123456789066cdf2', // ID cố định
          boardId: 'board_001',
          columnId: '670f1f1e1234567890abcde1',
          startDate: new Date('2024-08-26').getTime(),
          dueDate: new Date('2024-08-30').getTime(),
          title: 'Design Database Schema',
          description: 'Create high-level database schema diagram and define table relationships',
          isCompleted: false,
          attachments: [],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Create architecture diagram',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            }
          ],
          labelId: null,
          cover: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
          memberIds: [new ObjectId().toString()],
          comments: [],
          createdAt: Date.now(),
          updatedAt: null,
          _destroy: false
        }
      ]
    },
    {
      columnId: '670f1f1e1234567890abcde2', // ID cố định
      boardId: 'board_001',
      title: '🚀 In Progress',
      description: 'Tasks currently being worked on',
      cardOrderIds: ['670f1f1e1234567890abcdf3', '670f1f1e1234567890abcdf4'], // Thêm các cardId
      labelId: null,
      createdAt: Date.now(),
      updatedAt: null,
      _destroy: false,

      cards: [
        {
          cardId: '670f1f1e1234567890abcdf3', // ID cố định
          boardId: 'board_001',
          columnId: '670f1f1e1234567890abcde2',
          startDate: new Date('2024-08-28').getTime(),
          dueDate: new Date('2024-09-02').getTime(),
          title: 'Implement User Authentication',
          description: 'Develop login/logout functionality with JWT token management and password hashing',
          isCompleted: false,
          attachments: [
            {
              attachmentId: new ObjectId().toString(),
              url: 'https://example.com/files/auth-flow.png',
              name: 'auth-flow.png',
              uploadedAt: Date.now()
            }
          ],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Setup JWT authentication',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            },
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Implement password hashing',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            }
          ],
          labelId: null,
          cover: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400',
          memberIds: [new ObjectId().toString(), new ObjectId().toString()],
          comments: [
            {
              commentId: new ObjectId().toString(),
              userId: new ObjectId().toString(),
              userEmail: 'john.doe@example.com',
              userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
              useDisplayName: 'John Doe',
              content: 'Started working on JWT implementation',
              commentedAt: Date.now()
            }
          ],
          createdAt: Date.now(),
          updatedAt: null,
          _destroy: false
        },
        {
          cardId: '670f1f1e1234567890abcdf4', // ID cố định
          boardId: 'board_001',
          columnId: '670f1f1e1234567890abcde2',
          startDate: new Date('2024-08-29').getTime(),
          dueDate: new Date('2024-09-05').getTime(),
          title: 'Create API Endpoints',
          description: 'Build RESTful API endpoints for CRUD operations on main entities',
          isCompleted: false,
          attachments: [],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Create CRUD endpoints',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            }
          ],
          labelId: null,
          cover: null,
          memberIds: [new ObjectId().toString()],
          comments: [],
          createdAt: Date.now(),
          updatedAt: null,
          _destroy: false
        }
      ]
    },
    {
      columnId: '670f1f1e1234567890abcde3', // ID cố định
      boardId: 'board_001',
      title: '🔍 Review',
      description: 'Tasks pending review',
      // Thêm cardId
      labelId: null,
      createdAt: Date.now(),
      updatedAt: null,
      _destroy: false,

      cards: [
        {
          cardId: '670f1f1e1234567890abcdf5', // ID cố định
          boardId: 'board_001',
          columnId: '670f1f1e1234567890abcde3',
          startDate: new Date('2024-09-03').getTime(),
          dueDate: new Date('2024-09-06').getTime(),
          title: 'Frontend UI Components',
          description: 'Review and test all React components for consistency and responsive design',
          isCompleted: false,
          attachments: [],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Test responsive design',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            }
          ],
          labelId: null,
          cover: null,
          memberIds: [new ObjectId().toString(), new ObjectId().toString()],
          comments: [
            {
              commentId: new ObjectId().toString(),
              userId: new ObjectId().toString(),
              userEmail: 'jane.smith@example.com',
              userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=400',
              useDisplayName: 'Jane Smith',
              content: 'Components look good, just need to test on mobile',
              commentedAt: Date.now()
            }
          ],
          createdAt: Date.now(),
          updatedAt: null,
          _destroy: false
        },
        {
          cardId: '670f1f1e1234567890abcdf7', // ID cố định
          boardId: 'board_001',
          columnId: '670f1f1e1234567890abcde3',
          startDate: new Date('2024-09-04').getTime(),
          dueDate: new Date('2024-09-07').getTime(),
          title: 'API Response Validation',
          description: 'Review API responses for correct status codes and error handling',
          isCompleted: false,
          attachments: [],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Validate error responses',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            }
          ],
          labelId: null,
          cover: null,
          memberIds: [new ObjectId().toString()],
          comments: [],
          createdAt: Date.now(),
          updatedAt: null,
          _destroy: false
        },
        {
          cardId: '670f1f1e1234567890abcdf8', // ID cố định
          boardId: 'board_001',
          columnId: '670f1f1e1234567890abcde3',
          startDate: new Date('2024-09-05').getTime(),
          dueDate: new Date('2024-09-08').getTime(),
          title: 'Code Review Meeting',
          description: 'Organize code review meeting for the latest sprint deliverables',
          isCompleted: false,
          attachments: [],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Prepare code review checklist',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            }
          ],
          labelId: null,
          cover: null,
          memberIds: [new ObjectId().toString(), new ObjectId().toString()],
          comments: [],
          createdAt: Date.now(),
          updatedAt: null,
          _destroy: false
        }
      ]
    },
    {
      columnId: '670f1f1e1234567890abcde4', // ID cố định
      boardId: 'board_001',
      title: '✅ Done',
      description: 'Completed tasks',
      cardOrderIds: ['670f1f1e1234567890abcdf6'], // Thêm cardId
      labelId: null,
      createdAt: Date.now(),
      updatedAt: null,
      _destroy: false,

      cards: [
        {
          cardId: '670f1f1e1234567890abcdf6', // ID cố định
          boardId: 'board_001',
          columnId: '670f1f1e1234567890abcde4',
          startDate: new Date('2024-08-20').getTime(),
          dueDate: new Date('2024-08-24').getTime(),
          title: 'Project Documentation',
          description: 'Complete API documentation and user guide with examples and best practices',
          isCompleted: true,
          attachments: [
            {
              attachmentId: new ObjectId().toString(),
              url: 'https://example.com/files/api-docs.pdf',
              name: 'api-docs.pdf',
              uploadedAt: Date.now()
            },
            {
              attachmentId: new ObjectId().toString(),
              url: 'https://example.com/files/user-guide.docx',
              name: 'user-guide.docx',
              uploadedAt: Date.now()
            }
          ],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Write API documentation',
              isCompleted: true,
              createdAt: Date.now() - 86400000,
              updatedAt: Date.now()
            }
          ],
          labelId: null,
          cover: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400',
          memberIds: [new ObjectId().toString(), new ObjectId().toString()],
          comments: [
            {
              commentId: new ObjectId().toString(),
              userId: new ObjectId().toString(),
              userEmail: 'admin@example.com',
              userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
              useDisplayName: 'Admin',
              content: 'Documentation is complete and approved',
              commentedAt: Date.now()
            }
          ],
          createdAt: Date.now() - 345600000,
          updatedAt: Date.now(),
          _destroy: false
        }
      ]
    }
  ]
}

const kanbanTemplate = {
  title: 'Software Development Kanban',
  description: 'Agile software development workflow using Kanban methodology for continuous delivery',
  slug: 'software-development-kanban',
  type: 'public',
  columnOrderIds: [
    '670f1f1e1234567890abce01',
    '670f1f1e1234567890abce02',
    '670f1f1e1234567890abce03',
    '670f1f1e1234567890abce04'
  ], // Thêm các columnId
  ownerIds: [new ObjectId().toString()],
  memberIds: [],
  labelId: null,
  isTemplate: true,
  copyLength: 0,
  viewLength: 0,
  createdAt: Date.now(),
  updatedAt: null,
  _destroy: false,

  columns: [
    {
      columnId: '670f1f1e1234567890abce01', // ID cố định
      boardId: 'board_kanban_001',
      title: '📝 Ideas',
      description: 'Brainstorming and new feature ideas',
      cardOrderIds: ['670f1f1e1234567890abcf01', '670f1f1e1234567890abcf02'], // Thêm các cardId
      labelId: null,
      createdAt: Date.now(),
      updatedAt: null,
      _destroy: false,

      cards: [
        {
          cardId: '670f1f1e1234567890abcf01', // ID cố định
          boardId: 'board_kanban_001',
          columnId: '670f1f1e1234567890abce01',
          startDate: null,
          dueDate: null,
          title: 'Dark Mode Feature',
          description: 'Research and design dark mode theme for better user experience during night time usage',
          isCompleted: false,
          attachments: [],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Research dark mode UI patterns',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            }
          ],
          labelId: null,
          cover: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
          memberIds: [new ObjectId().toString()],
          comments: [],
          createdAt: Date.now(),
          updatedAt: null,
          _destroy: false
        },
        {
          cardId: '670f1f1e1234567890abcf02', // ID cố định
          boardId: 'board_kanban_001',
          columnId: '670f1f1e1234567890abce01',
          startDate: null,
          dueDate: null,
          title: 'Mobile App Push Notifications',
          description: 'Implement push notification system for real-time updates on mobile devices',
          isCompleted: false,
          attachments: [],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Define notification types and triggers',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            }
          ],
          labelId: null,
          cover: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400',
          memberIds: [new ObjectId().toString()],
          comments: [],
          createdAt: Date.now(),
          updatedAt: null,
          _destroy: false
        }
      ]
    },
    {
      columnId: '670f1f1e1234567890abce02', // ID cố định
      boardId: 'board_kanban_001',
      title: '📋 To Do',
      description: 'Ready to start tasks',
      cardOrderIds: ['670f1f1e1234567890abcf03'], // Thêm cardId
      labelId: null,
      createdAt: Date.now(),
      updatedAt: null,
      _destroy: false,

      cards: [
        {
          cardId: '670f1f1e1234567890abcf03', // ID cố định
          boardId: 'board_kanban_001',
          columnId: '670f1f1e1234567890abce02',
          startDate: new Date('2024-08-26').getTime(),
          dueDate: new Date('2024-08-30').getTime(),
          title: 'User Profile Settings',
          description:
            'Create comprehensive user profile page with settings for preferences, security, and account management',
          isCompleted: false,
          attachments: [
            {
              attachmentId: new ObjectId().toString(),
              url: 'https://figma.com/files/profile-wireframe',
              name: 'profile-wireframe.figma',
              uploadedAt: Date.now()
            }
          ],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Design profile page wireframe',
              isCompleted: true,
              createdAt: Date.now(),
              updatedAt: Date.now()
            },
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Create user settings API endpoints',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            }
          ],
          labelId: null,
          cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
          memberIds: [new ObjectId().toString(), new ObjectId().toString()],
          comments: [],
          createdAt: Date.now(),
          updatedAt: null,
          _destroy: false
        }
      ]
    },
    {
      columnId: '670f1f1e1234567890abce03', // ID cố định
      boardId: 'board_kanban_001',
      title: '🚀 Doing',
      description: 'Work in progress',
      cardOrderIds: ['670f1f1e1234567890abcf04'], // Thêm cardId
      labelId: null,
      createdAt: Date.now(),
      updatedAt: null,
      _destroy: false,

      cards: [
        {
          cardId: '670f1f1e1234567890abcf04', // ID cố định
          boardId: 'board_kanban_001',
          columnId: '670f1f1e1234567890abce03',
          startDate: new Date('2024-08-25').getTime(),
          dueDate: new Date('2024-09-01').getTime(),
          title: 'Payment Integration',
          description: 'Integrate Stripe payment gateway for subscription management and one-time purchases',
          isCompleted: false,
          attachments: [
            {
              attachmentId: new ObjectId().toString(),
              url: 'https://stripe.com/docs/api',
              name: 'stripe-api-docs.pdf',
              uploadedAt: Date.now()
            },
            {
              attachmentId: new ObjectId().toString(),
              url: 'https://example.com/files/payment-flow.png',
              name: 'payment-flow.png',
              uploadedAt: Date.now()
            }
          ],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Setup Stripe webhook endpoints',
              isCompleted: true,
              createdAt: Date.now(),
              updatedAt: Date.now()
            },
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Implement payment confirmation flow',
              isCompleted: false,
              createdAt: Date.now(),
              updatedAt: null
            }
          ],
          labelId: null,
          cover: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
          memberIds: [new ObjectId().toString(), new ObjectId().toString()],
          comments: [
            {
              commentId: new ObjectId().toString(),
              userId: new ObjectId().toString(),
              userEmail: 'developer@example.com',
              userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
              useDisplayName: 'Mike Wilson',
              content: 'Stripe webhooks are working correctly',
              commentedAt: Date.now()
            }
          ],
          createdAt: Date.now(),
          updatedAt: Date.now(),
          _destroy: false
        }
      ]
    },
    {
      columnId: '670f1f1e1234567890abce04', // ID cố định
      boardId: 'board_kanban_001',
      title: '✅ Done',
      description: 'Completed tasks',
      cardOrderIds: ['670f1f1e1234567890abcf05'], // Thêm cardId
      labelId: null,
      createdAt: Date.now(),
      updatedAt: null,
      _destroy: false,

      cards: [
        {
          cardId: '670f1f1e1234567890abcf05', // ID cố định
          boardId: 'board_kanban_001',
          columnId: '670f1f1e1234567890abce04',
          startDate: new Date('2024-08-15').getTime(),
          dueDate: new Date('2024-08-21').getTime(),
          title: 'Database Migration System',
          description: 'Complete database migration system with rollback capabilities and version control',
          isCompleted: true,
          attachments: [
            {
              attachmentId: new ObjectId().toString(),
              url: 'https://example.com/files/migration-guide.md',
              name: 'migration-guide.md',
              uploadedAt: Date.now()
            }
          ],
          checklists: [
            {
              checklistItemId: new ObjectId().toString(),
              content: 'Database migration documentation',
              isCompleted: true,
              createdAt: Date.now() - 604800000,
              updatedAt: Date.now() - 259200000
            }
          ],
          labelId: null,
          cover: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400',
          memberIds: [new ObjectId().toString()],
          comments: [
            {
              commentId: new ObjectId().toString(),
              userId: new ObjectId().toString(),
              userEmail: 'admin@example.com',
              userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
              useDisplayName: 'Admin',
              content: 'Migration system completed successfully',
              commentedAt: Date.now() - 259200000
            }
          ],
          createdAt: Date.now() - 777600000,
          updatedAt: Date.now() - 259200000,
          _destroy: false
        }
      ]
    }
  ]
}

module.exports = { managementTemplate, kanbanTemplate }
