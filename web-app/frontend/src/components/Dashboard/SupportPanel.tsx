import React from 'react';
import { MessageSquare, Calendar, CheckCircle, Clock } from 'lucide-react';
export function SupportPanel() {
  const supportTickets = [{
    id: 'T-2345',
    status: 'Resolved',
    title: 'API Integration Issue'
  }, {
    id: 'T-2344',
    status: 'Resolved',
    title: 'Billing Question'
  }, {
    id: 'T-2343',
    status: 'In Progress',
    title: 'Custom Report Request'
  }];
  const events = [{
    title: 'Strategy Call',
    date: 'March 15',
    time: '10:00 AM EST'
  }, {
    title: 'Quarterly Review',
    date: 'March 28',
    time: '2:00 PM EST'
  }, {
    title: 'Tech Training',
    date: 'April 2',
    time: '11:00 AM EST'
  }];
  return <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900">
          Support & Communication
        </h3>
      </div>
      <div className="px-6 py-4">
        <div className="bg-gray-50 p-4 rounded-md flex items-center">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Sarah Johnson" className="h-12 w-12 rounded-full" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              Your Dedicated Contact
            </p>
            <p className="text-sm text-gray-500">Sarah Johnson</p>
          </div>
          <button className="ml-auto bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded-md text-sm font-medium">
            <MessageSquare className="h-4 w-4 inline-block mr-1" />
            Chat
          </button>
        </div>
        <div className="mt-6 flex items-center">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
          <p className="text-sm text-gray-500">
            Live support status:{' '}
            <span className="font-medium text-green-600">Available</span>
          </p>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Recent Support Tickets
          </h4>
          <ul className="mt-2 divide-y divide-gray-200">
            {supportTickets.map(ticket => <li key={ticket.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {ticket.title}
                  </p>
                  <p className="text-xs text-gray-500">Ticket {ticket.id}</p>
                </div>
                <span className={`flex items-center text-xs ${ticket.status === 'Resolved' ? 'text-green-600' : 'text-amber-600'}`}>
                  {ticket.status === 'Resolved' ? <CheckCircle className="h-4 w-4 mr-1" /> : <Clock className="h-4 w-4 mr-1" />}
                  {ticket.status}
                </span>
              </li>)}
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
            Upcoming Events
          </h4>
          <ul className="mt-2 divide-y divide-gray-200">
            {events.map((event, index) => <li key={index} className="py-3 flex items-start">
                <Calendar className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {event.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {event.date} • {event.time}
                  </p>
                </div>
              </li>)}
          </ul>
        </div>
      </div>
    </div>;
}