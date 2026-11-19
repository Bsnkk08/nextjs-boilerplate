'use client';

import { useMemo, useState } from 'react';
import {
  Home,
  Search,
  CalendarDays,
  UserRound,
  Bell,
  SlidersHorizontal,
  ChevronRight,
  ChevronLeft,
  Heart,
  Star,
  MapPin,
  Utensils,
  Pizza,
  Soup,
  Coffee,
  CalendarCheck,
  Minus,
  Plus,
  Clock,
  Users,
  CheckCircle2,
  X,
  RotateCcw
} from 'lucide-react';

type Restaurant = {
  id: number;
  name: string;
  category: string;
  rating: string;
  reviews: string;
  distance: string;
  image: string;
  price: string;
  description: string;
};

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'ครัวบ้านเรา',
    category: 'อาหารไทย',
    rating: '4.8',
    reviews: '2.1k รีวิว',
    distance: '1.5 กม.',
    image:
      'https://images.unsplash.com/photo-1419815079400-585f2f8f9f8f?auto=format&fit=crop&w=900&q=85',
    price: '฿฿',
    description:
      'อาหารไทยรสชาติต้นตำรับ บรรยากาศอบอุ่นเหมือนทานข้าวที่บ้าน'
  },
  {
    id: 2,
    name: 'ร้านสไตล์คาเฟ่',
    category: 'คาเฟ่',
    rating: '4.7',
    reviews: '986 รีวิว',
    distance: '2.3 กม.',
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=85',
    price: '฿',
    description:
      'คาเฟ่บรรยากาศสบาย เหมาะกับนั่งชิลและพบปะเพื่อน'
  },
  {
    id: 3,
    name: 'บ้านอาหารไทย',
    category: 'อาหารไทย',
    rating: '4.6',
    reviews: '1.5k รีวิว',
    distance: '3.1 กม.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85',
    price: '฿฿',
    description:
      'เมนูอาหารไทยหลากหลาย พร้อมวัตถุดิบสดใหม่ทุกวัน'
  },
  {
    id: 4,
    name: 'พิซซ่าพาสต้า',
    category: 'อิตาเลียน',
    rating: '4.5',
    reviews: '750 รีวิว',
    distance: '2.8 กม.',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85',
    price: '฿฿฿',
    description:
      'พิซซ่าอบเตาถ่านและพาสต้าโฮมเมด'
  },
  {
    id: 5,
    name: 'Green Garden',
    category: 'คาเฟ่',
    rating: '4.9',
    reviews: '432 รีวิว',
    distance: '1.2 กม.',
    image:
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=900&q=85',
    price: '฿฿',
    description:
      'ร้านอาหารและคาเฟ่ในสวน บรรยากาศร่มรื่น'
  }
];

const categories = [
  { label: 'อาหารไทย', icon: Soup },
  { label: 'พิซซ่า', icon: Pizza },
  { label: 'อาหารญี่ปุ่น', icon: Utensils },
  { label: 'คาเฟ่', icon: Coffee }
];

const times = [
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00'
];

type Tab = 'home' | 'search' | 'bookings' | 'profile';
type Screen = 'list' | 'detail' | 'confirm';

type Booking = {
  id: number;
  restaurant: Restaurant;
  date: string;
  time: string;
  guests: number;
  status: string;
};

export default function Page() {
  const [tab, setTab] = useState<Tab>('home');
  const [screen, setScreen] = useState<Screen>('list');

  const [selected, setSelected] = useState<Restaurant>(restaurants[0]);
  const [category, setCategory] = useState('ทั้งหมด');
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  const [date, setDate] = useState('2026-11-20');
  const [time, setTime] = useState('12:00');
  const [guests, setGuests] = useState(2);

  const [bookings, setBookings] = useState<Booking[]>([]);

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const matchCategory =
        category === 'ทั้งหมด' || r.category === category;

      const matchName = r.name
        .toLowerCase()
        .includes(query.toLowerCase());

      return matchCategory && matchName;
    });
  }, [category, query]);

  // เปิดรายละเอียดร้าน
  const openRestaurant = (r: Restaurant) => {
    setSelected(r);
    setScreen('detail');
  };

  // จองร้านอาหาร
  const reserve = () => {
    const newBooking: Booking = {
      id: Date.now(),
      restaurant: selected,
      date,
      time,
      guests,
      status: 'ยืนยันแล้ว'
    };

    setBookings((prev) => [newBooking, ...prev]);
    setScreen('confirm');
  };

  // เปลี่ยนแท็บ
  const goTab = (t: Tab) => {
    setTab(t);
    setScreen('list');
  };

  // เพิ่มหรือลบร้านโปรด
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  return (
    <main className="app-shell">
      <div className="phone">

        {/* Status Bar */}
        <div className="status">
          <span>9:41</span>
          <span className="status-icons">▮▮▮ ◉ ▰</span>
        </div>

        {/* Header */}
        <header className="topbar">
          <div className="brand">
            <div className="brand-icon">
              <Utensils size={19} />
            </div>

            <div>
              <strong>TableReserve</strong>
              <small>จองร้านอาหารของคุณ</small>
            </div>
          </div>

          <button className="icon-btn">
            <Bell size={20} />
            <i className="notification-dot" />
          </button>
        </header>

        {/* ================= HOME ================= */}
        {screen === 'list' && tab === 'home' && (
          <>
            <section className="hero">
              <div className="hero-image" />

              <div className="hero-content">
                <p>ค้นพบร้านอร่อย</p>

                <h1>
                  จองโต๊ะร้านอาหาร
                  <br />
                  ได้ทุกที่ ทุกเวลา
                </h1>

                <span>มื้อพิเศษ เริ่มต้นได้ที่นี่</span>

                <button
                  className="primary small"
                  onClick={() => goTab('search')}
                >
                  เริ่มค้นหาร้าน
                  <ChevronRight size={16} />
                </button>
              </div>
            </section>

            {/* Categories */}
            <section className="section">
              <div className="section-heading">
                <h2>หมวดหมู่</h2>

                <button
                  className="text-link"
                  onClick={() => goTab('search')}
                >
                  ดูทั้งหมด <ChevronRight size={15} />
                </button>
              </div>

              <div className="categories">
                {categories.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className="category"
                    onClick={() => {
                      setCategory(label);
                      goTab('search');
                    }}
                  >
                    <span>
                      <Icon size={23} />
                    </span>
                    <small>{label}</small>
                  </button>
                ))}
              </div>
            </section>

            {/* Recommended restaurants */}
            <section className="section">
              <div className="section-heading">
                <h2>ร้านแนะนำ</h2>

                <button
                  className="text-link"
                  onClick={() => goTab('search')}
                >
                  ดูทั้งหมด <ChevronRight size={15} />
                </button>
              </div>

              <div className="restaurant-grid">
                {restaurants.slice(0, 4).map((r) => (
                  <RestaurantCard
                    key={r.id}
                    restaurant={r}
                    favorite={favorites.includes(r.id)}
                    onFavorite={() => toggleFavorite(r.id)}
                    onClick={() => openRestaurant(r)}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        {/* ================= SEARCH ================= */}
        {screen === 'list' && tab === 'search' && (
          <section className="search-page">
            <div className="page-title">
              <h1>ค้นหาร้านอาหาร</h1>

              <button className="icon-btn">
                <SlidersHorizontal size={19} />
              </button>
            </div>

            {/* Search input */}
            <div className="searchbox">
              <Search size={18} />

              <input
                placeholder="ค้นหาร้านอาหาร..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

              <button onClick={() => setQuery('')}>
                <X size={15} />
              </button>
            </div>

            {/* Category filters */}
            <div className="chips">
              {[
                'ทั้งหมด',
                'อาหารไทย',
                'คาเฟ่',
                'อิตาเลียน'
              ].map((c) => (
                <button
                  key={c}
                  className={category === c ? 'chip active' : 'chip'}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Restaurant list */}
            <div className="list-restaurants">
              {filtered.length > 0 ? (
                filtered.map((r) => (
                  <RestaurantRow
                    key={r.id}
                    restaurant={r}
                    favorite={favorites.includes(r.id)}
                    onFavorite={() => toggleFavorite(r.id)}
                    onClick={() => openRestaurant(r)}
                  />
                ))
              ) : (
                <div className="empty">
                  <Search size={40} />
                  <h3>ไม่พบร้านอาหาร</h3>
                  <p>ลองค้นหาด้วยคำอื่น</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================= BOOKINGS ================= */}
        {screen === 'list' && tab === 'bookings' && (
          <section className="bookings-page">
            <div className="page-title">
              <h1>การจองของฉัน</h1>

              <button
                className="icon-btn"
                onClick={() => setBookings([])}
                title="ล้างรายการจอง"
              >
                <RotateCcw size={18} />
              </button>
            </div>

            <div className="chips">
              <button className="chip active">ทั้งหมด</button>
              <button className="chip">กำลังจะถึง</button>
              <button className="chip">เสร็จสิ้น</button>
              <button className="chip">ยกเลิก</button>
            </div>

            {bookings.length === 0 ? (
              <div className="empty">
                <CalendarCheck size={46} />
                <h3>ยังไม่มีรายการจอง</h3>
                <p>
                  ค้นหาร้านอาหารและจองโต๊ะที่คุณชื่นชอบ
                </p>

                <button
                  className="primary"
                  onClick={() => goTab('search')}
                >
                  ค้นหาร้านอาหาร
                </button>
              </div>
            ) : (
              <div className="list-restaurants">
                {bookings.map((b) => (
                  <div className="booking-card" key={b.id}>
                    <img src={b.restaurant.image} alt={b.restaurant.name} />

                    <div className="booking-info">
                      <div className="booking-title">
                        <strong>{b.restaurant.name}</strong>
                        <span className="status-pill">
                          {b.status}
                        </span>
                      </div>

                      <small>
                        <CalendarDays size={13} />
                        {b.date} · {b.time}
                      </small>

                      <small>
                        <Users size={13} />
                        {b.guests} คน
                      </small>

                      <button
                        className="text-link"
                        onClick={() => {
                          setSelected(b.restaurant);
                          setDate(b.date);
                          setTime(b.time);
                          setGuests(b.guests);
                          setScreen('detail');
                        }}
                      >
                        ดูรายละเอียด <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ================= PROFILE ================= */}
        {screen === 'list' && tab === 'profile' && (
          <section className="profile-page">
            <div className="profile-head">
              <div className="avatar">U</div>
              <h2>ผู้ใช้งาน</h2>
              <p>user@example.com</p>
            </div>

            <div className="profile-menu">
              <button>
                <UserRound />
                ข้อมูลส่วนตัว
                <ChevronRight />
              </button>

              <button>
                <Heart />
                ร้านโปรด ({favorites.length})
                <ChevronRight />
              </button>

              <button>
                <Bell />
                การแจ้งเตือน
                <ChevronRight />
              </button>

              <button>
                <SlidersHorizontal />
                ตั้งค่า
                <ChevronRight />
              </button>
            </div>
          </section>
        )}

        {/* ================= DETAIL ================= */}
        {screen === 'detail' && (
          <section className="detail-page">
            <div
              className="detail-image"
              style={{
                backgroundImage: `url(${selected.image})`
              }}
            >
              <button
                className="back-float"
                onClick={() => setScreen('list')}
              >
                <ChevronLeft />
              </button>

              <button
                className="heart-float"
                onClick={() => toggleFavorite(selected.id)}
              >
                <Heart
                  fill={
                    favorites.includes(selected.id)
                      ? 'currentColor'
                      : 'none'
                  }
                />
              </button>
            </div>

            <div className="detail-body">
              <h1>{selected.name}</h1>

              <div className="meta">
                <span className="rating">
                  <Star size={14} fill="currentColor" />
                  {selected.rating} ({selected.reviews})
                </span>

                <span>
                  <MapPin size={14} />
                  {selected.distance}
                </span>

                <span>{selected.price}</span>
              </div>

              <p className="description">
                {selected.description}
              </p>

              <div className="detail-tabs">
                <button className="selected">ข้อมูลร้าน</button>
                <button>เมนู</button>
                <button>รีวิว</button>
              </div>

              <div className="features">
                <span>
                  <Utensils /> อาหาร
                </span>

                <span>
                  <Coffee /> คาเฟ่
                </span>

                <span>
                  <Users /> เหมาะกับกลุ่ม
                </span>
              </div>

              <h3>เลือกวันที่และเวลา</h3>

              {/* Date picker */}
              <label className="date-field">
                <CalendarDays size={17} />

                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                />
              </label>

              {/* Time selection */}
              <div className="time-grid">
                {times.map((t) => (
                  <button
                    key={t}
                    className={time === t ? 'time selected' : 'time'}
                    onClick={() => setTime(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Guest counter */}
              <div className="guest-row">
                <div>
                  <strong>จำนวนที่นั่ง</strong>
                  <small>จำนวนผู้เข้าร่วม</small>
                </div>

                <div className="counter">
                  <button
                    onClick={() =>
                      setGuests((g) => Math.max(1, g - 1))
                    }
                  >
                    <Minus size={15} />
                  </button>

                  <b>{guests}</b>

                  <button
                    onClick={() =>
                      setGuests((g) => Math.min(12, g + 1))
                    }
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              {/* Reserve button */}
              <button className="primary reserve" onClick={reserve}>
                <CalendarCheck size={18} />
                ยืนยันการจอง
              </button>
            </div>
          </section>
        )}

        {/* ================= CONFIRMATION ================= */}
        {screen === 'confirm' && (
          <section className="confirmation">
            <div className="success-icon">
              <CheckCircle2 size={46} />
            </div>

            <h1>จองโต๊ะสำเร็จ!</h1>
            <p>ระบบบันทึกการจองของคุณแล้ว</p>

            <div className="confirm-card">
              <img src={selected.image} alt={selected.name} />

              <div>
                <strong>{selected.name}</strong>

                <small>
                  <CalendarDays size={14} />
                  {date}
                </small>

                <small>
                  <Clock size={14} />
                  {time}
                </small>

                <small>
                  <Users size={14} />
                  {guests} คน
                </small>
              </div>
            </div>

            <button
              className="primary"
              onClick={() => goTab('bookings')}
            >
              ดูรายการจองของฉัน
            </button>

            <button
              className="secondary"
              onClick={() => goTab('home')}
            >
              กลับหน้าแรก
            </button>
          </section>
        )}

        {/* ================= BOTTOM NAV ================= */}
        {screen === 'list' && (
          <nav className="bottom-nav">
            {(
              [
                {
                  id: 'home',
                  label: 'หน้าแรก',
                  Icon: Home
                },
                {
                  id: 'search',
                  label: 'ค้นหา',
                  Icon: Search
                },
                {
                  id: 'bookings',
                  label: 'การจอง',
                  Icon: CalendarDays
                },
                {
                  id: 'profile',
                  label: 'บัญชี',
                  Icon: UserRound
                }
              ] as const
            ).map(({ id, label, Icon }) => (
              <button
                key={id}
                className={
                  tab === id
                    ? 'nav-item active'
                    : 'nav-item'
                }
                onClick={() => goTab(id)}
              >
                <Icon size={21} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        )}
      </div>
    </main>
  );
}

/* ================= RESTAURANT CARD ================= */

function RestaurantCard({
  restaurant: r,
  favorite,
  onFavorite,
  onClick
}: {
  restaurant: Restaurant;
  favorite: boolean;
  onFavorite: () => void;
  onClick: () => void;
}) {
  return (
    <article className="restaurant-card">
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${r.image})`
        }}
        onClick={onClick}
      >
        <button
          className="favorite"
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
        >
          <Heart
            size={16}
            fill={favorite ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      <div className="card-info" onClick={onClick}>
        <strong>{r.name}</strong>

        <div>
          <span className="rating">
            <Star size={12} fill="currentColor" />
            {r.rating}
          </span>

          <span>
            <MapPin size={12} />
            {r.distance}
          </span>
        </div>
      </div>
    </article>
  );
}

/* ================= RESTAURANT ROW ================= */

function RestaurantRow({
  restaurant: r,
  favorite,
  onFavorite,
  onClick
}: {
  restaurant: Restaurant;
  favorite: boolean;
  onFavorite: () => void;
  onClick: () => void;
}) {
  return (
    <article className="restaurant-row">
      <div
        className="row-image"
        style={{
          backgroundImage: `url(${r.image})`
        }}
        onClick={onClick}
      />

      <div className="row-info" onClick={onClick}>
        <strong>{r.name}</strong>

        <small>{r.category}</small>

        <div className="rating">
          <Star size={13} fill="currentColor" />
          {r.rating} ({r.reviews})
        </div>

        <small>
          <MapPin size={13} />
          {r.distance}
        </small>
      </div>

      <button className="row-heart" onClick={onFavorite}>
        <Heart
          size={17}
          fill={favorite ? 'currentColor' : 'none'}
        />
      </button>

      <button className="row-arrow" onClick={onClick}>
        <ChevronRight size={17} />
      </button>
    </article>
  );
}