import React from 'react';
import { ArrowRight } from 'lucide-react';
export function ProjectUpdates() {
  const projects = [{
    id: 'P-1001',
    title: 'Custom Sync-in',
    status: 'In Progress',
    progress: 65,
    lastUpdate: 'Mar 10, 2023',
    description: 'Building custom Typeform data pipeline for affiliate network.'
  }, {
    id: 'P-1002',
    title: 'Membership Management System',
    status: 'In Progress',
    progress: 40,
    lastUpdate: 'Mar 8, 2023',
    description: 'Developing centralized affiliate management tool.'
  }, {
    id: 'P-1003',
    title: 'Reporting Dashboard',
    status: 'In Progress',
    progress: 25,
    lastUpdate: 'Mar 5, 2023',
    description: 'Creating network-wide analytics dashboard.'
  }];
  return <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">
          Project Status Updates
        </h3>
      </div>
      <div className="px-6 py-4">
        <ul className="divide-y divide-gray-200">
          {projects.map(project => <li key={project.id} className="py-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h4 className="text-sm font-medium text-gray-900">
                      {project.title}
                    </h4>
                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800">
                      {project.status}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    {project.description}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  Updated {project.lastUpdate}
                </span>
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium text-gray-900">
                    {project.progress}%
                  </span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{
                width: `${project.progress}%`
              }}></div>
                </div>
              </div>
              <div className="mt-3 text-right">
                <a href="#" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80">
                  View details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </li>)}
        </ul>
      </div>
    </div>;
}