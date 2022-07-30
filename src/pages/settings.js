import { Tab } from '@headlessui/react'
import UserSettings from '../components/UserSettings'
import UserPassword from '../components/UserPassword'

const Settings = () => {
  return (
    <div className="h-full w-full m-0 text-gray-600">
      <Tab.Group>
        <Tab.List className={'flex justify-center p-10'}>
          <Tab>
            {({ selected }) => (
              <div
                className={
                  selected
                    ? 'border-b-4 border-important-color p-4 w-full pb-1.5 basis-full'
                    : 'p-4 w-full pb-1.5 basis-full bg-white border-b-4 border-gray-200'
                }
              >
                User settings
              </div>
            )}
          </Tab>
          <Tab>
            {({ selected }) => (
              <div
                className={
                  selected
                    ? 'border-b-4 border-important-color p-4 w-full pb-1.5 basis-full'
                    : 'p-4 w-full pb-1.5 basis-full bg-white border-b-4 border-gray-200'
                }
              >
                Password
              </div>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <UserSettings />
          <UserPassword />
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Settings
