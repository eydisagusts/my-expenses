'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [text, setText] = useState("");
  const [cost, setCost] = useState("");
  const [stats, setStats] = useState(0);
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState<{ id: string; text: string; cost: string }[]>([]);

  function handleAdd() {
    const costValue = Number.parseFloat(cost);
    if (!Number.isNaN(costValue)) {
      setStats(stats + costValue);
      setCount(count + 1);
      setNotifications([
        ...notifications, 
        { id: uuidv4(), text, cost }
      ]);
      setText("");
      setCost("");
    }
  }

  function handleCloseNotification(id) {
    setNotifications(notifications.filter(notification => notification.id !== id));
  }

  return (
    <div>
      <NameInput text={text} setText={setText} />
      <CostInput cost={cost} setCost={setCost} handleAdd={handleAdd} />
      <Stats stats={stats} count={count} />
      <Count count={count} />
      <div className='fixed top-5 right-5 space-y-4'>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onClose={() => handleCloseNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
}

function NameInput({ text, setText }) {
  return (
    <div className='text-black'>
      <div>
        <h1 className='text-green-300 text-6xl p-10 ml-20'>Add Expense</h1>
      </div>
      <div>
        <p className='inline text-white text-3xl ml-36'>Name</p>
        <input
          id="name-input"
          name="name"
          className='ml-10 gap-8 px-8 py-1 border-2'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
}

function CostInput({ cost, setCost, handleAdd }) {
  return (
    <div className='text-black mt-4'>
      <p className='inline text-white text-3xl ml-36'>Cost</p>
      <input
        id="cost-input"
        name="cost"
        className='ml-14 gap-8 px-8 py-1 border-2'
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />
      <div>
        <button
          className='text-black text-4xl ml-36 mt-10 border-2 border-white bg-white p-1'
          type='button'
          onClick={handleAdd}
        >
          <p>Add</p>
        </button>
      </div>
    </div>
  );
}

function Stats({ stats, count }) {
  return (
    <div>
      <h2 className='text-green-300 text-6xl mt-10 ml-28'>Stats</h2>
      <p className='ml-32 text-2xl mt-8'>Sum: {stats}</p>
    </div>
  );
}

function Count({ count }) {
  return (
    <div>
      <p className='ml-32 text-2xl'>Count: {count}</p>
    </div>
  );
}

function Notification({ notification, onClose }) {
  const [isClosing, setIsClosing] = useState(false);

  function handleClose() {
    setIsClosing(true);
    setTimeout(onClose, 500);
  }
  return (
    <div
      className={`relative border-2 border-green-300 p-6 w-96 bg-gray-700 z-50 mt-20 mr-36
        ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}
      `}
    >
      <button
        className='absolute top-1 right-2 text-lg cursor-pointer text-red-600 font-bold'
        type="button"
        onClick={handleClose}
      >
        X
      </button>
      <div className='text-left'>
        <p><span className='font-bold text-xl'>Name:</span> {notification.text}</p>
        <p><span className='font-bold text-xl'>Cost:</span> {notification.cost}</p>
      </div>
    </div>
  );
}