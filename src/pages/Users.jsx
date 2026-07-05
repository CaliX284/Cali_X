import AddNewUser from "../Features/authentication/AddNewUser";

function Users() {
  return (
    <div>
      <div className="my-2 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold"> إدارة المستخدمين</h3>
          <p className="text-[14px] font-semibold text-stone-600">
            واداره الحساب{" "}
          </p>
        </div>
        <AddNewUser />
      </div>
    </div>
  );
}

export default Users;
