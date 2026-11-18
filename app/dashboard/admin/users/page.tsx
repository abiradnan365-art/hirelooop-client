import { getUseers } from '@/lib/api/user';
import React from 'react';

const AdminUsersPage = async () => {

    const users = await getUseers();
    console.log('users', users);

    return (
        <div>
            
        </div>
    );
};

export default AdminUsersPage;