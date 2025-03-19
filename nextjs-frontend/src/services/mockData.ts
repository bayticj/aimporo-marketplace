// Mock data for development purposes
export const mockGigs = [
  {
    id: 1,
    title: 'Professional Logo Design',
    description: 'I will create a professional, modern logo for your business or brand. The package includes unlimited revisions, multiple file formats, and full copyright ownership.',
    price: 49.99,
    delivery_time: 2,
    requirements: 'Please provide your business name, any specific colors or styles you prefer, and a brief description of your business.',
    location: 'New York',
    thumbnail: '/assets/img/gigs/gigs-01.jpg',
    images: [
      '/assets/img/gigs/gigs-01.jpg', 
      '/assets/img/gigs/gigs-02.jpg', 
      '/assets/img/gigs/gigs-03.jpg'
    ],
    tags: ['logo', 'design', 'branding'],
    average_rating: 4.8,
    reviews_count: 124,
    is_featured: true,
    is_active: true,
    user: {
      id: 2,
      name: 'CreativeStudio',
      email: 'creative@example.com',
      profile: {
        avatar: '/assets/img/profiles/avatar-1.jpg',
        bio: 'Professional graphic designer with over 5 years of experience.',
        location: 'New York',
        member_since: '2020-01-01',
      }
    },
    category: {
      id: 5,
      name: 'Graphic Design'
    }
  },
  {
    id: 2,
    title: 'Website Development with React',
    description: 'I will build a modern, responsive website using React and Next.js. Your site will be fast, SEO-friendly, and easy to maintain.',
    price: 299.99,
    delivery_time: 7,
    requirements: 'Please provide your design files, content, and any specific functionality requirements.',
    location: 'San Francisco',
    thumbnail: '/assets/img/gigs/gigs-02.jpg',
    images: [
      '/assets/img/gigs/gigs-02.jpg', 
      '/assets/img/gigs/gigs-03.jpg', 
      '/assets/img/gigs/gigs-01.jpg'
    ],
    tags: ['web development', 'react', 'next.js'],
    average_rating: 4.9,
    reviews_count: 87,
    is_featured: true,
    is_active: true,
    user: {
      id: 3,
      name: 'TechDev Solutions',
      email: 'techdev@example.com',
      profile: {
        avatar: '/assets/img/profiles/avatar-2.jpg',
        bio: 'Full-stack developer specializing in React and modern web technologies.',
        location: 'San Francisco',
        member_since: '2019-05-15',
      }
    },
    category: {
      id: 2,
      name: 'Web Development'
    }
  },
  {
    id: 3,
    title: 'Social Media Marketing Campaign',
    description: 'I will create and manage a complete social media marketing campaign for your business. Increase your engagement, followers, and sales through strategic content.',
    price: 199.99,
    delivery_time: 14,
    requirements: 'Please provide information about your business, target audience, and marketing goals.',
    location: 'Los Angeles',
    thumbnail: '/assets/img/gigs/gigs-03.jpg',
    images: [
      '/assets/img/gigs/gigs-03.jpg', 
      '/assets/img/gigs/gigs-01.jpg', 
      '/assets/img/gigs/gigs-02.jpg'
    ],
    tags: ['social media', 'marketing', 'advertising'],
    average_rating: 4.7,
    reviews_count: 63,
    is_featured: false,
    is_active: true,
    user: {
      id: 4,
      name: 'Digital Marketing Pro',
      email: 'marketing@example.com',
      profile: {
        avatar: '/assets/img/profiles/avatar-3.jpg',
        bio: 'Digital marketing expert with expertise in social media growth and brand development.',
        location: 'Los Angeles',
        member_since: '2021-02-10',
      }
    },
    category: {
      id: 3,
      name: 'Digital Marketing'
    }
  }
];

export const mockDigitalProducts = [
  {
    id: 1,
    title: 'Premium UI Kit for Web Designers',
    description: 'A comprehensive UI kit with over 500 components for modern web design. Includes responsive layouts, form elements, navigation components, and more. All components are fully customizable and available in both light and dark modes.',
    price: 59.99,
    original_price: 79.99,
    preview_path: '/assets/img/digital/digital-01.jpg',
    file_path: '/files/ui-kit.zip',
    file_type: 'application/zip',
    file_size: '256000000', // 256MB
    download_limit: null,
    user_id: 3,
    category_id: 2,
    is_featured: true,
    tags: ['ui-kit', 'design', 'web-design', 'figma'],
    average_rating: 4.7,
    reviews_count: 52,
    user: {
      id: 3,
      name: 'DesignMaster',
      email: 'design@example.com',
      profile: {
        avatar: '/assets/img/profiles/avatar-2.jpg',
        bio: 'UI/UX designer with 8 years of experience creating beautiful digital experiences.',
        location: 'San Francisco',
        member_since: '2019-03-15',
      }
    },
    category: {
      id: 2,
      name: 'UI Design'
    }
  },
  {
    id: 2,
    title: 'E-commerce Website Template',
    description: 'A complete e-commerce website template built with HTML, CSS, and JavaScript. Features product listings, shopping cart, checkout process, and admin dashboard.',
    price: 39.99,
    original_price: 49.99,
    preview_path: '/assets/img/digital/digital-02.jpg',
    file_path: '/files/ecommerce-template.zip',
    file_type: 'application/zip',
    file_size: '45000000', // 45MB
    download_limit: null,
    user_id: 5,
    category_id: 1,
    is_featured: true,
    tags: ['e-commerce', 'website', 'template', 'html'],
    average_rating: 4.5,
    reviews_count: 38,
    user: {
      id: 5,
      name: 'WebTemplates',
      email: 'templates@example.com',
      profile: {
        avatar: '/assets/img/profiles/avatar-4.jpg',
        bio: 'Professional web developer creating premium templates for businesses.',
        location: 'London',
        member_since: '2020-06-22',
      }
    },
    category: {
      id: 1,
      name: 'Web Templates'
    }
  }
];

export const mockSoftwareProducts = [
  {
    id: 1,
    title: 'Advanced Task Management Software',
    description: 'A powerful task management software for teams and individuals. Features include Kanban boards, time tracking, task dependencies, custom fields, and advanced reporting. Available for Windows, Mac, and Linux.',
    price: 79.99,
    original_price: 99.99,
    preview_path: '/assets/img/digital/digital-01.jpg',
    file_path: '/files/software.zip',
    file_type: 'application/zip',
    file_size: '154000000', // 154MB
    download_limit: null,
    user_id: 5,
    category_id: 3,
    is_featured: true,
    tags: ['productivity', 'task-management', 'project-management', 'kanban'],
    average_rating: 4.6,
    reviews_count: 38,
    user: {
      id: 5,
      name: 'SoftwareExperts',
      email: 'software@example.com',
      profile: {
        avatar: '/assets/img/profiles/avatar-3.jpg',
        bio: 'Developing quality software solutions since 2015.',
        location: 'Berlin',
        member_since: '2018-06-20',
      }
    },
    category: {
      id: 3,
      name: 'Productivity Software'
    },
    system_requirements: {
      windows: 'Windows 10 or higher, 4GB RAM, 500MB disk space',
      mac: 'macOS 10.15 or higher, 4GB RAM, 500MB disk space',
      linux: 'Ubuntu 20.04 or equivalent, 4GB RAM, 500MB disk space'
    },
    license_type: 'Lifetime license for 1 user',
    version: '2.5.1',
    release_date: '2023-06-15'
  },
  {
    id: 2,
    title: 'Video Editing Pro Suite',
    description: 'Professional video editing software with advanced features including color grading, motion tracking, special effects, and 4K support. Includes over 500 transitions and effects.',
    price: 149.99,
    original_price: 199.99,
    preview_path: '/assets/img/digital/digital-03.jpg',
    file_path: '/files/video-editing.zip',
    file_type: 'application/x-msdownload',
    file_size: '2500000000', // 2.5GB
    download_limit: 3,
    user_id: 6,
    category_id: 4,
    is_featured: true,
    tags: ['video-editing', 'multimedia', 'professional', '4k'],
    average_rating: 4.8,
    reviews_count: 56,
    user: {
      id: 6,
      name: 'MediaTools',
      email: 'mediatools@example.com',
      profile: {
        avatar: '/assets/img/profiles/avatar-5.jpg',
        bio: 'Creating professional media tools for content creators worldwide.',
        location: 'Los Angeles',
        member_since: '2017-11-05',
      }
    },
    category: {
      id: 4,
      name: 'Multimedia Software'
    },
    system_requirements: {
      windows: 'Windows 10 64-bit, 16GB RAM, 5GB disk space, Dedicated GPU with 4GB VRAM',
      mac: 'macOS 11 or higher, 16GB RAM, 5GB disk space, Dedicated GPU with 4GB VRAM',
      linux: 'Not available for Linux'
    },
    license_type: 'Lifetime license for 2 computers',
    version: '4.2.0',
    release_date: '2023-04-10'
  }
]; 