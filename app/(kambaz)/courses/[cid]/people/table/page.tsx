'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PeopleTable from "../Table";
import * as client from "../../../client";

export default function People() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const { cid } = useParams();
  const fetchUsers = async () => {
    const users = await client.findUsersForCourse(cid as string);
    setUsers(users);
  };
  
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);
  
 return (
  <div id="wd-people-table">
    <PeopleTable users={users} fetchUsers={fetchUsers} />
  </div> 
  );
}