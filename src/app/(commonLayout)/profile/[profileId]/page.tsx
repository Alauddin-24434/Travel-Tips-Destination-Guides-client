'use client'
import { Avatar } from '@nextui-org/avatar'
import { Badge } from '@nextui-org/badge'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { CheckIcon } from 'lucide-react'
import {
  FaCalendarAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone
} from 'react-icons/fa'
import { Divider } from '@nextui-org/divider'
import { Button } from '@nextui-org/button'
import { format } from 'date-fns'
import { useGetSingleUserQuery } from '@/redux/features/auth/authApi'
import Loading from '@/components/ui/Loading'



interface IProps {
  params: {
    profileId: string
  }
}

const SingleProfilePage = ({ params }: IProps) => {
  const { data: userData, isLoading: userDataLoading } = useGetSingleUserQuery({
    userId: params?.profileId
  })

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      {userDataLoading && <Loading />}
      <div>
        <Card className='bg-background shadow-lg overflow-hidden'>
          <CardHeader className='relative p-0 mb-4'>
            <div className='w-full h-48 bg-gradient-to-r from-blue-400 to-blue-600' />
            <div className='absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-3/4 w-32 h-32'>
              <Badge
                isOneChar
                className={`${!userData?.data?.isVerified ? 'hidden' : ''}`}
                color='success'
                content={<CheckIcon />}
                placement='bottom-right'
                shape='circle'>
                <Avatar
                  isBordered
                  className='w-32 h-32'
                  color='primary'
                  src={userData?.data?.profileImage}
                />
              </Badge>
            </div>
          </CardHeader>
          <CardBody className='px-4 pb-8'>
            <div className='text-center mb-6'>
              <h1 className='text-3xl font-bold mb-2'>
                {userData?.data?.name}
              </h1>
              <p className='text-default-500 mb-4'>
                {userData?.data?.bio ? userData?.data?.bio : 'Bio not provided'}
              </p>
              <div className='flex items-center justify-center'>
                <FaMapMarkerAlt className='text-primary mr-2' />
                <span className='text-default-500'>
                  {' '}
                  {userData?.data?.address
                    ? userData?.data?.address
                    : 'Address not provided'}
                </span>
              </div>
            </div>

            <Divider className='my-6' />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <FaEnvelope className='text-primary mr-3' />
                  <div>
                    <p className='text-sm text-default-500'>Email</p>
                    <p className='font-medium'>{userData?.data?.email}</p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <FaPhone className='text-primary mr-3' />
                  <div>
                    <p className='text-sm text-default-500'>Phone</p>
                    <p className='font-medium'>
                      {userData?.data?.mobileNumber}
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <FaCalendarAlt className='text-primary mr-3' />
                  <div>
                    <p className='text-sm text-default-500'>Birthday</p>
                    <p className='font-medium'>{userData?.data?.birthDate}</p>
                  </div>
                </div>
              </div>
              <div className='space-y-4'>
                <Button
                  color='default'
                  style={{
                    justifyContent: 'space-between',
                    display: 'flex',
                    width: '100%',
                    padding: '16px',
                    borderRadius: '10px'
                  }}>
                  <span className='font-medium'>Followers</span>
                  <span className='text-primary font-bold'>
                    {userData?.data?.followers?.length}
                  </span>
                </Button>

                <Button
                  color='default'
                  style={{
                    justifyContent: 'space-between',
                    display: 'flex',
                    width: '100%',
                    padding: '16px',
                    borderRadius: '10px'
                  }}>
                  <span className='font-medium'>Following</span>
                  <span className='text-primary font-bold'>
                    {userData?.data?.following?.length}
                  </span>
                </Button>
                <div className='flex justify-between items-center p-3 bg-default-100 rounded-lg'>
                  <span className='font-medium'>Member since</span>
                  {userData?.data?.createdAt && (
                    <span className='text-primary font-bold'>
                      {' '}
                      {format(
                        new Date(userData?.data?.createdAt),
                        'MMM dd, yyyy'
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Divider className='my-6' />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default SingleProfilePage
