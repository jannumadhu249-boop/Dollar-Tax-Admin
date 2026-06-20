import React, { useState } from 'react';
import { Eye, Download, Search, Calendar, FileText } from 'lucide-react';

export default function MemberList({ selectedStatus = 'registered-users', selectedYear = 'TY2025' }) {
  const numericYear = selectedYear ? selectedYear.replace('TY', '') : '2025';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('New'); // 'New' or 'Modified'
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeDetailTab, setActiveDetailTab] = useState('personal');

  // Load the initial members list matching the screenshot
  const initialMembersRaw = [
    { sNo: 1, name: 'Amardeep Kumar', fileNo: '31010', filingType: 'E-Filing', email: 'amardeep.k@gmail.com', regDate: '2026-06-05 09:10:48', status: 'Scheduling Pending', statusDate: '2026-06-11 22:50:13' },
    { sNo: 2, name: 'Narashima Vaddala', fileNo: '101570', filingType: 'E-Filing', email: 'narashima.v@yahoo.com', regDate: '2026-05-29 13:34:52', status: 'Scheduling Pending', statusDate: '2026-05-29 21:32:49' },
    { sNo: 3, name: 'Anubhav Yadav', fileNo: '41795', filingType: 'E-Filing', email: 'anubhav.yadav@hotmail.com', regDate: '2026-05-26 11:23:09', status: 'Scheduling Pending', statusDate: '2026-06-04 21:58:31' },
    { sNo: 4, name: 'Manideep Yenugula', fileNo: '63129', filingType: 'E-Filing', email: 'manideep.y@outlook.com', regDate: '2026-05-28 20:07:51', status: 'Scheduling Pending', statusDate: '2026-06-11 22:43:56' },
    { sNo: 5, name: 'Nitish Yadav', fileNo: '101569', filingType: 'E-Filing', email: 'nitish.yadav@gmail.com', regDate: '2026-05-28 11:23:37', status: 'Scheduling Pending', statusDate: '2026-06-04 00:16:43' },
    { sNo: 6, name: 'Edwin Okpobrisi', fileNo: '101568', filingType: 'E-Filing', email: 'edwin.okp@firm.org', regDate: '2026-05-27 03:36:15', status: 'Scheduling Pending', statusDate: '2026-05-27 04:02:00' },
    { sNo: 7, name: 'Vedant Nimbhore', fileNo: '101567', filingType: 'E-Filing', email: 'vedant.nimb@gmail.com', regDate: '2026-05-26 16:02:40', status: 'Scheduling Pending', statusDate: '2026-06-11 22:48:51' },
    { sNo: 8, name: 'Arun Kumar', fileNo: '20530', filingType: 'E-Filing', email: 'arunkumar@tech.net', regDate: '2026-05-23 12:24:55', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-03 02:34:25' },
    { sNo: 9, name: 'Prince Kumar', fileNo: '101564', filingType: 'E-Filing', email: 'prince.kumar@yahoo.com', regDate: '2026-05-17 09:15:46', status: 'Scheduling Pending', statusDate: '2026-05-19 22:43:43' },
    { sNo: 10, name: 'Himani Uday Gadve', fileNo: '52575', filingType: 'E-Filing', email: 'himani.gadve@outlook.com', regDate: '2026-05-16 02:41:14', status: 'Scheduling Pending', statusDate: '2026-05-16 03:54:55' },
    { sNo: 11, name: 'Baishampayan Roy', fileNo: '101563', filingType: 'E-Filing', email: 'baishampayan.roy@gmail.com', regDate: '2026-05-13 21:14:57', status: 'E-Filing Accepted & Filing Complete', statusDate: '2026-06-02 02:21:05' },

    // PAYMENT PENDING - EFILING mock records (Total: 670 mock sample)
    { sNo: 101, name: 'Maitryi Das', fileNo: '100017', filingType: 'E-Filing', email: 'maitryi.das@gmail.com', regDate: '2025-12-28 01:33:59', status: 'Payment Pending - Efiling', statusDate: '2026-06-20 03:57:34' },
    { sNo: 102, name: 'Shashank Yelagandula', fileNo: '80921', filingType: 'Paper Filing', email: 'shashank.y@gmail.com', regDate: '2026-01-19 02:45:45', status: 'Payment Pending - Efiling', statusDate: '2026-06-19 01:02:57' },
    { sNo: 103, name: 'Bipin Kumar Dwivedi', fileNo: '100027', filingType: 'Paper Filing', email: 'bipin.dwivedi@gmail.com', regDate: '2025-12-30 05:18:26', status: 'Payment Pending - Efiling', statusDate: '2026-06-17 21:36:20' },
    { sNo: 104, name: 'Saikrishna Bobba', fileNo: '42023', filingType: 'E-Filing', email: 'saikrishna.bobba@gmail.com', regDate: '2026-03-12 00:51:43', status: 'Payment Pending - Efiling', statusDate: '2026-06-16 21:32:23' },
    { sNo: 105, name: 'Sukanya Ghosh', fileNo: '101270', filingType: 'Paper Filing', email: 'sukanya.ghosh@gmail.com', regDate: '2026-04-02 07:19:05', status: 'Payment Pending - Efiling', statusDate: '2026-06-15 23:35:28' },
    { sNo: 106, name: 'Rahul Malhotra', fileNo: '91394', filingType: 'Paper Filing', email: 'rahul.malhotra@gmail.com', regDate: '2025-12-29 10:39:03', status: 'Payment Pending - Efiling', statusDate: '2026-06-15 23:26:44' },
    { sNo: 107, name: 'Subba Raju Koneti', fileNo: '20499', filingType: 'E-Filing', email: 'subbaraju.k@gmail.com', regDate: '2026-04-14 00:42:05', status: 'Payment Pending - Efiling', statusDate: '2026-06-15 23:18:15' },
    { sNo: 108, name: 'Sarnatha Medisetti', fileNo: '70570', filingType: 'E-Filing', email: 'sarnatha.m@gmail.com', regDate: '2026-03-24 03:59:47', status: 'Payment Pending - Efiling', statusDate: '2026-06-15 22:30:04' },
    { sNo: 109, name: 'Karan Soni', fileNo: '52467', filingType: 'E-Filing', email: 'karan.soni@gmail.com', regDate: '2026-04-14 21:19:24', status: 'Payment Pending - Efiling', statusDate: '2026-06-15 22:08:19' },
    { sNo: 110, name: 'Dushyanth Reddy Boppidi', fileNo: '52538', filingType: 'E-Filing', email: 'dushyanth.b@gmail.com', regDate: '2026-01-26 23:30:03', status: 'Payment Pending - Efiling', statusDate: '2026-06-15 22:02:30' },
    { sNo: 111, name: 'Santosh Kumar Moosaramthola', fileNo: '101558', filingType: 'Paper Filing', email: 'santosh.moos@gmail.com', regDate: '2026-05-01 05:07:09', status: 'Payment Pending - Efiling', statusDate: '2026-06-15 22:01:03' },
    { sNo: 112, name: 'Shahanaz Muthukumar', fileNo: '101109', filingType: 'E-Filing', email: 'shahanaz.m@gmail.com', regDate: '2026-03-24 16:18:36', status: 'Payment Pending - Efiling', statusDate: '2026-06-15 21:59:59' },
    { sNo: 113, name: 'Rakesh Lavu', fileNo: '63152', filingType: 'Paper Filing', email: 'rakesh.lavu@gmail.com', regDate: '2026-01-20 20:41:06', status: 'Payment Pending - Efiling', statusDate: '2026-06-15 21:58:17' },
    { sNo: 114, name: 'Prasankumar Barre', fileNo: '101520', filingType: 'E-Filing', email: 'prasan.barre@gmail.com', regDate: '2026-04-14 21:56:12', status: 'Payment Pending - Efiling', statusDate: '2026-06-15 21:56:27' },
    { sNo: 115, name: 'Sumanpreet Sandhu', fileNo: '90755', filingType: 'E-Filing', email: 'sumanpreet.s@consult.com', regDate: '2026-05-27 23:31:54', status: 'Payment Pending - Efiling', statusDate: '2026-06-11 23:02:40' },
    { sNo: 116, name: 'Aayush Barai', fileNo: '101208', filingType: 'Paper Filing', email: 'aayush.barai@gmail.com', regDate: '2026-03-30 23:40:45', status: 'Payment Pending - Efiling', statusDate: '2026-06-15 21:52:36' },
    { sNo: 117, name: 'Shabudeen Ghani Syed', fileNo: '100628', filingType: 'Paper Filing', email: 'shabudeen.s@gmail.com', regDate: '2026-02-23 07:33:07', status: 'Payment Pending - Efiling', statusDate: '2026-06-11 23:09:25' },
    { sNo: 118, name: 'Suresh Udutha', fileNo: '100242', filingType: 'E-Filing', email: 'suresh.udutha@gmail.com', regDate: '2026-01-31 01:34:45', status: 'Payment Pending - Efiling', statusDate: '2026-06-11 23:02:56' },
    { sNo: 119, name: 'Dharani Neela', fileNo: '101556', filingType: 'Paper Filing', email: 'dharani.neela@gmail.com', regDate: '2026-04-30 02:19:31', status: 'Payment Pending - Efiling', statusDate: '2026-06-08 22:01:03' },
    { sNo: 120, name: 'Neel Raval', fileNo: '101566', filingType: 'Paper Filing', email: 'neel.raval@gmail.com', regDate: '2026-05-20 23:03:56', status: 'Payment Pending - Efiling', statusDate: '2026-06-03 21:34:34' },

    // PAYMENT PENDING - PAPER FILING mock records (Total: 25 mock sample)
    { sNo: 201, name: 'Vishnuvardhan Janapati', fileNo: '101376', filingType: 'E-Filing', email: 'vishnu.janapati@gmail.com', regDate: '2026-04-07 13:24:28', status: 'Payment Pending - Paper filing', statusDate: '2026-04-16 00:45:02' },
    { sNo: 202, name: 'Sandeep Malik', fileNo: '101192', filingType: 'Paper Filing', email: 'sandeep.malik@outlook.com', regDate: '2026-03-30 00:50:14', status: 'Payment Pending - Paper filing', statusDate: '2026-04-15 21:43:22' },
    { sNo: 203, name: 'Shashi Gudikandula', fileNo: '70353', filingType: 'E-Filing', email: 'shashi.gudikandula@yahoo.com', regDate: '2026-01-29 10:06:39', status: 'Payment Pending - Paper filing', statusDate: '2026-04-14 04:05:26' },
    { sNo: 204, name: 'Lubin Lincy Greencelin Abraham', fileNo: '100214', filingType: 'Paper Filing', email: 'lubin.abraham@gmail.com', regDate: '2026-01-29 03:20:01', status: 'Payment Pending - Paper filing', statusDate: '2026-04-14 04:04:46' },
    { sNo: 205, name: 'Santosh Kumar Reddy Palli', fileNo: '52489', filingType: 'E-Filing', email: 'santosh.palli@tech.com', regDate: '2026-01-30 01:48:06', status: 'Payment Pending - Paper filing', statusDate: '2026-04-13 23:39:20' },
    { sNo: 206, name: 'Ravikant Yadav', fileNo: '91500', filingType: 'E-Filing', email: 'ravikant.yadav@gmail.com', regDate: '2025-12-26 23:52:24', status: 'Payment Pending - Paper filing', statusDate: '2026-04-13 23:38:35' },
    { sNo: 207, name: 'Harshavardhana reddy Penubadi', fileNo: '100857', filingType: 'Paper Filing', email: 'harsha.penubadi@gmail.com', regDate: '2026-02-24 23:52:15', status: 'Payment Pending - Paper filing', statusDate: '2026-04-13 23:37:55' },
    { sNo: 208, name: 'Mohanraj Nandakumar', fileNo: '90041', filingType: 'Paper Filing', email: 'mohanraj.n@gmail.com', regDate: '2026-02-06 08:31:00', status: 'Payment Pending - Paper filing', statusDate: '2026-04-09 05:22:17' },
    { sNo: 209, name: 'Amit Subandh', fileNo: '101005', filingType: 'Paper Filing', email: 'amit.subandh@gmail.com', regDate: '2026-03-17 04:49:07', status: 'Payment Pending - Paper filing', statusDate: '2026-03-29 05:29:16' },
    { sNo: 210, name: 'Venkat Bandaru', fileNo: '100012', filingType: 'E-Filing', email: 'venkat.bandaru@gmail.com', regDate: '2025-12-22 21:11:50', status: 'Payment Pending - Paper filing', statusDate: '2026-03-24 05:38:11' },
    { sNo: 211, name: 'Sivaraman Vaitheeswaran', fileNo: '90226', filingType: 'E-Filing', email: 'sivaraman.v@gmail.com', regDate: '2026-01-09 06:32:51', status: 'Payment Pending - Paper filing', statusDate: '2026-03-21 04:41:18' },
    { sNo: 212, name: 'Venugopal Reddy Nimmanapalli', fileNo: '100294', filingType: 'E-Filing', email: 'venu.nimma@gmail.com', regDate: '2026-02-03 03:04:08', status: 'Payment Pending - Paper filing', statusDate: '2026-03-19 23:58:21' },
    { sNo: 213, name: 'Nagendran Arumugam', fileNo: '100502', filingType: 'Paper Filing', email: 'nagendran.a@gmail.com', regDate: '2026-02-16 09:13:05', status: 'Payment Pending - Paper filing', statusDate: '2026-03-17 00:56:14' },
    { sNo: 214, name: 'Ambuj Shukla', fileNo: '100652', filingType: 'Paper Filing', email: 'ambuj.shukla@gmail.com', regDate: '2026-02-24 06:45:20', status: 'Payment Pending - Paper filing', statusDate: '2026-03-13 23:15:45' },
    { sNo: 215, name: 'Uma Sankar Chamalla', fileNo: '100287', filingType: 'Paper Filing', email: 'uma.chamalla@gmail.com', regDate: '2026-02-02 10:33:53', status: 'Payment Pending - Paper filing', statusDate: '2026-03-06 22:05:55' },
    { sNo: 216, name: 'FNU Pranay Kumar', fileNo: '80134', filingType: 'E-Filing', email: 'pranay.kumar@gmail.com', regDate: '2026-01-23 00:01:21', status: 'Payment Pending - Paper filing', statusDate: '2026-02-28 02:38:56' },
    { sNo: 217, name: 'Taher Vora', fileNo: '70517', filingType: 'Paper Filing', email: 'taher.vora@gmail.com', regDate: '2026-02-14 02:03:50', status: 'Payment Pending - Paper filing', statusDate: '2026-02-21 02:38:13' },
    { sNo: 218, name: 'Simon Sasikar Samuel', fileNo: '100425', filingType: 'Paper Filing', email: 'simon.samuel@gmail.com', regDate: '2026-02-11 07:30:35', status: 'Payment Pending - Paper filing', statusDate: '2026-02-19 23:33:56' },
    { sNo: 219, name: 'Miren Dodhiya', fileNo: '70257', filingType: 'E-Filing', email: 'miren.dodhiya@gmail.com', regDate: '2026-01-24 21:27:12', status: 'Payment Pending - Paper filing', statusDate: '2026-02-16 23:48:08' },
    { sNo: 220, name: 'Sandeep Goud Desharapu', fileNo: '100097', filingType: 'Paper Filing', email: 'sandeep.desh@gmail.com', regDate: '2026-01-21 07:39:28', status: 'Payment Pending - Paper filing', statusDate: '2026-02-15 03:32:05' },

    // FEE PAYMENT RECEIVED - II mock records (Total: 13 mock sample)
    { sNo: 301, name: 'Raj Kamal', fileNo: '10047', filingType: 'E-Filing', email: 'raj.kamal@gmail.com', regDate: '2025-12-22 23:51:16', status: 'Fee Payment Received - II', statusDate: '2026-06-20 00:16:30' },
    { sNo: 302, name: 'Sandeep Bodigalla', fileNo: '41798', filingType: 'E-Filing', email: 'sandeep.bodigalla@yahoo.com', regDate: '2026-01-26 19:58:52', status: 'Fee Payment Received - II', statusDate: '2026-06-20 00:14:27' },
    { sNo: 303, name: 'Akash Mali', fileNo: '101430', filingType: 'E-Filing', email: 'akash.mali@gmail.com', regDate: '2026-04-10 03:18:07', status: 'Fee Payment Received - II', statusDate: '2026-06-20 00:12:16' },
    { sNo: 304, name: 'Amar Gaikwad', fileNo: '100705', filingType: 'Paper Filing', email: 'amar.gaikwad@hotmail.com', regDate: '2026-03-01 00:44:29', status: 'Fee Payment Received - II', statusDate: '2026-06-20 00:08:34' },
    { sNo: 305, name: 'Chintesh Pulavarthi', fileNo: '91389', filingType: 'E-Filing', email: 'chintesh.p@gmail.com', regDate: '2026-01-30 01:09:46', status: 'Fee Payment Received - II', statusDate: '2026-06-20 00:05:53' },
    { sNo: 306, name: 'Shivaprasad Adampalli Venkateshappa', fileNo: '91449', filingType: 'E-Filing', email: 'shivaprasad.a@gmail.com', regDate: '2026-03-31 09:12:31', status: 'Fee Payment Received - II', statusDate: '2026-06-20 00:04:12' },
    { sNo: 307, name: 'Alpeshkumar Patel', fileNo: '71002', filingType: 'E-Filing', email: 'alpeshkumar.patel@gmail.com', regDate: '2026-01-20 02:57:07', status: 'Fee Payment Received - II', statusDate: '2026-06-20 00:00:07' },
    { sNo: 308, name: 'Portchelvan Venkatesan', fileNo: '31400', filingType: 'E-Filing', email: 'portchelvan.v@gmail.com', regDate: '2025-12-23 04:45:40', status: 'Fee Payment Received - II', statusDate: '2026-06-19 23:42:50' },
    { sNo: 309, name: 'Saurabh Rege', fileNo: '52570', filingType: 'Paper Filing', email: 'saurabh.rege@gmail.com', regDate: '2026-04-06 19:59:56', status: 'Fee Payment Received - II', statusDate: '2026-06-19 23:39:03' },
    { sNo: 310, name: 'Anuja Patil', fileNo: '100780', filingType: 'Paper Filing', email: 'anuja.patil@gmail.com', regDate: '2026-03-04 23:54:26', status: 'Fee Payment Received - II', statusDate: '2026-04-06 23:30:57' },
    { sNo: 311, name: 'Yatin Kumar Goyal', fileNo: '101076', filingType: 'E-Filing', email: 'yatin.goyal@gmail.com', regDate: '2026-03-21 22:53:22', status: 'Fee Payment Received - II', statusDate: '2026-04-04 02:16:09' },
    { sNo: 312, name: 'Lakshmi Devi meghana Chintalapati', fileNo: '100881', filingType: 'Paper Filing', email: 'lakshmi.c@gmail.com', regDate: '2026-03-10 22:24:11', status: 'Fee Payment Received - II', statusDate: '2026-04-03 01:14:29' },
    { sNo: 313, name: 'Ravikanth Goud Koyyada', fileNo: '62930', filingType: 'E-Filing', email: 'ravikanth.k@gmail.com', regDate: '2026-03-03 02:03:40', status: 'Fee Payment Received - II', statusDate: '2026-03-13 05:12:02' },

    // CLIENT REVIEW - EFILING mock records (Total: 30 records)
    { sNo: 401, name: 'Priya Sharma', fileNo: '101580', filingType: 'E-Filing', email: 'priya.sharma@gmail.com', regDate: '2026-02-11 08:22:14', status: 'Client Review - Efiling', statusDate: '2026-06-20 09:15:00' },
    { sNo: 402, name: 'Rajan Mehta', fileNo: '91502', filingType: 'E-Filing', email: 'rajan.mehta@outlook.com', regDate: '2026-01-28 14:33:50', status: 'Client Review - Efiling', statusDate: '2026-06-20 08:47:22' },
    { sNo: 403, name: 'Deepak Nair', fileNo: '80923', filingType: 'E-Filing', email: 'deepak.nair@yahoo.com', regDate: '2025-12-31 19:05:37', status: 'Client Review - Efiling', statusDate: '2026-06-20 07:31:55' },
    { sNo: 404, name: 'Sujata Krishnamurthy', fileNo: '100850', filingType: 'E-Filing', email: 'sujata.k@gmail.com', regDate: '2026-03-05 11:00:00', status: 'Client Review - Efiling', statusDate: '2026-06-19 23:10:44' },
    { sNo: 405, name: 'Arjun Bhatt', fileNo: '101400', filingType: 'E-Filing', email: 'arjun.bhatt@gmail.com', regDate: '2026-04-02 07:45:19', status: 'Client Review - Efiling', statusDate: '2026-06-19 22:30:18' },
    { sNo: 406, name: 'Meena Venkataraman', fileNo: '71005', filingType: 'E-Filing', email: 'meena.v@gmail.com', regDate: '2026-01-18 16:54:02', status: 'Client Review - Efiling', statusDate: '2026-06-19 21:55:09' },
    { sNo: 407, name: 'Kiran Rao', fileNo: '52580', filingType: 'E-Filing', email: 'kiran.rao@hotmail.com', regDate: '2026-05-09 09:12:41', status: 'Client Review - Efiling', statusDate: '2026-06-19 20:44:37' },
    { sNo: 408, name: 'Sunil Deshpande', fileNo: '100300', filingType: 'E-Filing', email: 'sunil.desh@gmail.com', regDate: '2026-02-22 20:17:53', status: 'Client Review - Efiling', statusDate: '2026-06-19 19:10:05' },
    { sNo: 409, name: 'Ananya Ghosh', fileNo: '101050', filingType: 'E-Filing', email: 'ananya.ghosh@gmail.com', regDate: '2026-03-14 05:38:29', status: 'Client Review - Efiling', statusDate: '2026-06-19 18:27:14' },
    { sNo: 410, name: 'Vivek Pillai', fileNo: '42050', filingType: 'E-Filing', email: 'vivek.pillai@gmail.com', regDate: '2026-01-09 23:55:46', status: 'Client Review - Efiling', statusDate: '2026-06-19 17:03:50' },
    { sNo: 411, name: 'Lavanya Subramanian', fileNo: '63200', filingType: 'E-Filing', email: 'lavanya.s@gmail.com', regDate: '2026-04-21 12:00:00', status: 'Client Review - Efiling', statusDate: '2026-06-19 16:22:11' },
    { sNo: 412, name: 'Mohan Iyer', fileNo: '101130', filingType: 'E-Filing', email: 'mohan.iyer@tech.com', regDate: '2026-03-30 04:19:07', status: 'Client Review - Efiling', statusDate: '2026-06-19 15:50:00' },
    { sNo: 413, name: 'Sunita Kapoor', fileNo: '90760', filingType: 'E-Filing', email: 'sunita.kapoor@gmail.com', regDate: '2026-02-14 17:42:33', status: 'Client Review - Efiling', statusDate: '2026-06-19 14:38:46' },
    { sNo: 414, name: 'Rahul Gupta', fileNo: '101320', filingType: 'E-Filing', email: 'rahul.gupta@yahoo.com', regDate: '2026-04-15 00:25:54', status: 'Client Review - Efiling', statusDate: '2026-06-19 13:20:30' },
    { sNo: 415, name: 'Nidhi Agarwal', fileNo: '100550', filingType: 'E-Filing', email: 'nidhi.agarwal@gmail.com', regDate: '2026-02-28 08:00:14', status: 'Client Review - Efiling', statusDate: '2026-06-19 12:05:19' },
    { sNo: 416, name: 'Farhan Siddiqui', fileNo: '101210', filingType: 'E-Filing', email: 'farhan.s@gmail.com', regDate: '2026-03-18 21:11:02', status: 'Client Review - Efiling', statusDate: '2026-06-19 11:44:55' },
    { sNo: 417, name: 'Pooja Mishra', fileNo: '52600', filingType: 'E-Filing', email: 'pooja.mishra@gmail.com', regDate: '2026-04-01 13:33:48', status: 'Client Review - Efiling', statusDate: '2026-06-19 10:22:40' },
    { sNo: 418, name: 'Srinivas Reddy', fileNo: '80934', filingType: 'E-Filing', email: 'srinivas.reddy@outlook.com', regDate: '2026-01-31 06:48:29', status: 'Client Review - Efiling', statusDate: '2026-06-19 09:00:00' },
    { sNo: 419, name: 'Radha Krishnan', fileNo: '101160', filingType: 'E-Filing', email: 'radha.k@gmail.com', regDate: '2026-03-22 18:55:11', status: 'Client Review - Efiling', statusDate: '2026-06-19 08:33:14' },
    { sNo: 420, name: 'Ganesh Babu', fileNo: '71010', filingType: 'E-Filing', email: 'ganesh.babu@gmail.com', regDate: '2026-02-07 02:14:39', status: 'Client Review - Efiling', statusDate: '2026-06-19 07:10:23' },
    { sNo: 421, name: 'Chitra Anand', fileNo: '100870', filingType: 'E-Filing', email: 'chitra.anand@hotmail.com', regDate: '2026-04-09 23:40:57', status: 'Client Review - Efiling', statusDate: '2026-06-18 22:55:41' },
    { sNo: 422, name: 'Sankar Raman', fileNo: '91510', filingType: 'E-Filing', email: 'sankar.raman@gmail.com', regDate: '2026-01-15 10:22:05', status: 'Client Review - Efiling', statusDate: '2026-06-18 21:33:29' },
    { sNo: 423, name: 'Geeta Pandey', fileNo: '42060', filingType: 'E-Filing', email: 'geeta.pandey@gmail.com', regDate: '2026-05-12 00:09:44', status: 'Client Review - Efiling', statusDate: '2026-06-18 20:10:08' },
    { sNo: 424, name: 'Rohit Joshi', fileNo: '100620', filingType: 'E-Filing', email: 'rohit.joshi@gmail.com', regDate: '2026-02-25 15:30:21', status: 'Client Review - Efiling', statusDate: '2026-06-18 18:47:53' },
    { sNo: 425, name: 'Abhinav Kumar Sinha', fileNo: '101350', filingType: 'E-Filing', email: 'abhinav.sinha@gmail.com', regDate: '2026-04-18 07:57:36', status: 'Client Review - Efiling', statusDate: '2026-06-18 17:25:00' },
    { sNo: 426, name: 'Vasudha Gopalakrishnan', fileNo: '101000', filingType: 'E-Filing', email: 'vasudha.g@gmail.com', regDate: '2026-03-08 14:45:02', status: 'Client Review - Efiling', statusDate: '2026-06-18 16:00:37' },
    { sNo: 427, name: 'Ashwin Menon', fileNo: '63215', filingType: 'E-Filing', email: 'ashwin.menon@gmail.com', regDate: '2026-01-22 21:03:15', status: 'Client Review - Efiling', statusDate: '2026-06-18 14:38:12' },
    { sNo: 428, name: 'Swati Kulkarni', fileNo: '100900', filingType: 'E-Filing', email: 'swati.kulkarni@gmail.com', regDate: '2026-03-26 09:29:44', status: 'Client Review - Efiling', statusDate: '2026-06-18 13:15:48' },
    { sNo: 429, name: 'Praveen Nambiar', fileNo: '90780', filingType: 'E-Filing', email: 'praveen.nambiar@gmail.com', regDate: '2026-02-18 03:12:58', status: 'Client Review - Efiling', statusDate: '2026-06-18 11:55:27' },
    { sNo: 430, name: 'Sucharita Das', fileNo: '52620', filingType: 'E-Filing', email: 'sucharita.das@gmail.com', regDate: '2026-04-26 20:06:13', status: 'Client Review - Efiling', statusDate: '2026-06-18 10:30:05' },

    // CLIENT REVIEW - PAPER FILING mock records (Total: 1 record)
    { sNo: 501, name: 'Dhruv Chauhan', fileNo: '100295', filingType: 'Paper Filing', email: 'dhruv.chauhan@gmail.com', regDate: '2026-02-10 11:30:00', status: 'Client Review - Paper Filing', statusDate: '2026-06-19 15:42:00' },

    // Seed some members for other tax years to show filtering works
    { sNo: 1001, name: 'John Doe', fileNo: '99001', filingType: 'E-Filing', email: 'john.doe@gmail.com', regDate: '2025-05-10 10:00:00', status: 'Scheduling Pending', statusDate: '2025-05-12 11:00:00', year: '2024' },
    { sNo: 1002, name: 'Jane Smith', fileNo: '99002', filingType: 'Paper Filing', email: 'jane.smith@gmail.com', regDate: '2025-04-12 09:15:00', status: 'Scheduling Pending', statusDate: '2025-04-15 10:00:00', year: '2024' },
    { sNo: 1003, name: 'Alice Johnson', fileNo: '99003', filingType: 'E-Filing', email: 'alice.j@gmail.com', regDate: '2024-06-01 14:20:00', status: 'Scheduling Pending', statusDate: '2024-06-05 16:30:00', year: '2023' },
    { sNo: 1004, name: 'Bob Brown', fileNo: '99004', filingType: 'E-Filing', email: 'bob.brown@gmail.com', regDate: '2023-05-20 11:30:00', status: 'Scheduling Pending', statusDate: '2023-05-22 14:00:00', year: '2022' },
    { sNo: 1005, name: 'Charlie Green', fileNo: '99005', filingType: 'Paper Filing', email: 'charlie.g@gmail.com', regDate: '2022-04-15 10:10:00', status: 'Scheduling Pending', statusDate: '2022-04-18 11:20:00', year: '2021' }
  ];

  const initialMembers = initialMembersRaw.map(m => ({
    ...m,
    year: m.year || (m.regDate.startsWith('2026') || m.regDate.startsWith('2025-12') || m.regDate.startsWith('2025-11') ? '2025' : '2024')
  }));

  const [membersList, setMembersList] = useState(initialMembers);

  // Comments history database mapped by member sNo
  const [commentsHistory, setCommentsHistory] = useState({
    1: [
      { status: 'Scheduling Pending', comments: 'vm sent - pallavi', dateTime: '06-15-2026 :: 23:26' },
      { status: 'Scheduling Pending', comments: 'vm sent - pallavi', dateTime: '06-11-2026 :: 22:50' },
      { status: 'Scheduling Pending', comments: 'vm sent - pallavi', dateTime: '06-08-2026 :: 23:04' },
      { status: 'Scheduling Pending', comments: 'call not answered - Nagasri', dateTime: '06-05-2026 :: 21:25' }
    ]
  });

  // Track unmasked fields generally (supports table and detail views)
  const [unmaskedFields, setUnmaskedFields] = useState({});
  const [verificationOtp, setVerificationOtp] = useState('');
  const [verificationFieldKey, setVerificationFieldKey] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpError, setOtpError] = useState('');

  // Comment Form States
  const [commentText, setCommentText] = useState('');
  const [commentStatus, setCommentStatus] = useState('Scheduling Pending');

  const handleFieldClick = (fieldKey, rawValue, isCurrentlyUnmasked) => {
    if (isCurrentlyUnmasked) {
      setUnmaskedFields(prev => ({
        ...prev,
        [fieldKey]: false
      }));
    } else {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationOtp(code);
      setVerificationFieldKey(fieldKey);
      setOtpInput('');
      setOtpError('');
      setShowOtpModal(true);
    }
  };

  const getMaskedEmail = (email) => {
    if (!email) return '';
    const parts = email.split('@');
    return 'XXXXXXXXXX.' + parts[parts.length - 1].split('.').pop();
  };

  const handleExport = (option) => {
    alert(`Exporting database to Excel Format (Option: ${option})...`);
  };

  const filteredMembers = membersList.filter(member => {
    let matchesStatus = true;
    if (selectedStatus === 'scheduling-pending') {
      matchesStatus = member.status === 'Scheduling Pending';
    } else if (selectedStatus === 'info-pending') {
      matchesStatus = member.status === 'Information Pending';
    } else if (selectedStatus === 'interview-pending') {
      matchesStatus = member.status === 'Interview Pending';
    } else if (selectedStatus === 'docs-pending') {
      matchesStatus = member.status === 'Documents Pending';
    } else if (selectedStatus === 'cancelled') {
      matchesStatus = member.status === 'Cancelled';
    } else if (selectedStatus === 'registered-users') {
      matchesStatus = ['Scheduling Pending', 'Information Pending', 'Interview Pending', 'Documents Pending'].includes(member.status);
    } else if (selectedStatus === 'payment-pending-efiling') {
      matchesStatus = member.status === 'Payment Pending - Efiling';
    } else if (selectedStatus === 'payable-pending-paper-filing') {
      matchesStatus = member.status === 'Payment Pending - Paper filing';
    } else if (selectedStatus === 'fee-payment-received-1') {
      matchesStatus = member.status === 'Fee Payment Received - I';
    } else if (selectedStatus === 'fee-payment-received-2') {
      matchesStatus = member.status === 'Fee Payment Received - II';
    } else if (selectedStatus === 'client-review-efiling') {
      matchesStatus = member.status === 'Client Review - Efiling';
    } else if (selectedStatus === 'client-review-paper-filing') {
      matchesStatus = member.status === 'Client Review - Paper Filing';
    } else if (selectedStatus === 'just-uploaded-docs') {
      matchesStatus = false; // No records currently uploaded
    }

    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.fileNo.includes(searchTerm) ||
                          member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || member.regDate.startsWith(filterDate);
    const matchesYear = member.year === numericYear;
    return matchesStatus && matchesSearch && matchesDate && matchesYear;
  });

  const getHeaderTitle = () => {
    switch (selectedStatus) {
      case 'all-registered': return 'All Registered Members';
      case 'registered-users': return 'Registered Users (Pre-Processing)';
      case 'info-pending': return 'Information Pending Members';
      case 'scheduling-pending': return 'Scheduling Pending Members';
      case 'interview-pending': return 'Interview Pending Members';
      case 'docs-pending': return 'Documents Pending Members';
      case 'cancelled': return 'Cancelled Registrations';
      case 'query-list': return 'Query List';
      case 'payment-pending-efiling': return 'Payment Pending - Efiling';
      case 'payable-pending-paper-filing': return 'Payment Pending - Paper filing';
      case 'fee-payment-received-1': return 'Fee Payment Received - I';
      case 'fee-payment-received-2': return 'Fee Payment Received - II';
      case 'client-review-efiling': return 'Client Review - Efiling';
      case 'client-review-paper-filing': return 'Client Review - Paper Filing';
      case 'just-uploaded-docs': return 'Just Uploaded Documents';
      default: return 'Registered Members';
    }
  };

  // Helper to resolve detailed fields for active member
  const getMemberDetails = (member) => {
    if (!member) return null;
    if (member.sNo === 1) {
      return {
        personal: {
          firstName: 'AMARDEEP',
          middleName: '',
          lastName: 'KUMAR',
          contactNumber: '8739732888',
          alternateNumber: '8739732888',
          timeZone: 'PST',
          ssn: '188-71-7012',
          dob: '01-05-1986',
          employer: '',
          gender: 'MALE',
          occupation: 'IT ENGINEER',
          visaType: 'H1B',
          email: 'amardeep.k@gmail.com',
          address: '36163 FREMONT BLVD APT 10',
          city: 'FREMONT',
          state: 'CA',
          zipcode: '94536',
          filingStatus: 'MARRIED FILING JOINT',
          filingType: 'E-FILING',
          firstEntry: '01-26-2014',
          marriageDate: '11-19-2013',
          referred: 'YES',
          referredName: '',
          referredEmail: '',
          updatedAt: '2019-01-27 22:41:04'
        },
        spouse: {
          firstName: 'ANSHU',
          middleName: 'KUMARI',
          lastName: 'BARANWAL',
          ssn: '949-96-1255',
          dob: '12-02-1990',
          occupation: 'HOUSEWIFE',
          visaType: 'H4',
          taxIdType: 'SSN OR ITIN',
          passportNumber: '',
          passportExpiry: '',
          visaNumber: '',
          visaExpiry: '',
          usaEntry: '',
          updatedAt: '2019-01-27 22:42:42'
        },
        dependents: [
          { name: 'DISHA BARANWAL', ssn: '714-31-3458', relationship: 'DAUGHTER', dob: '03-17-2024', visa: 'USCITIZEN', updated: '2024-11-04 07:59:26' },
          { name: 'VIVAAN BARANWAL', ssn: '968-98-7445', relationship: 'SON', dob: '10-05-2017', visa: 'H4', updated: '2019-01-27 22:48:41' }
        ],
        bank: {
          bankName: 'Chase',
          accountNumber: '909999713',
          routingNumber: '322271627',
          accountType: 'Checking Account',
          updatedAt: '2023-02-23 00:34:27'
        }
      };
    }

    const nameParts = member.name.split(' ');
    const fName = nameParts[0] || 'John';
    const lName = nameParts[nameParts.length - 1] || 'Doe';

    return {
      personal: {
        firstName: fName.toUpperCase(),
        middleName: '',
        lastName: lName.toUpperCase(),
        contactNumber: '9876543210',
        alternateNumber: '9876543210',
        timeZone: 'EST',
        ssn: `999-00-${member.fileNo.substring(0, 4)}`,
        dob: '08-15-1990',
        employer: 'TECH SOLUTIONS',
        gender: 'MALE',
        occupation: 'SOFTWARE DEVELOPER',
        visaType: 'H1B',
        email: member.email,
        address: '100 Main St Apt 2C',
        city: 'Jersey City',
        state: 'NJ',
        zipcode: '07302',
        filingStatus: 'SINGLE',
        filingType: member.filingType,
        firstEntry: '08-12-2018',
        marriageDate: '',
        referred: 'NO',
        referredName: '',
        referredEmail: '',
        updatedAt: member.regDate
      },
      spouse: {
        firstName: '',
        middleName: '',
        lastName: '',
        ssn: '',
        dob: '',
        occupation: '',
        visaType: '',
        taxIdType: '',
        passportNumber: '',
        passportExpiry: '',
        visaNumber: '',
        visaExpiry: '',
        usaEntry: '',
        updatedAt: ''
      },
      dependents: [],
      bank: {
        bankName: 'Bank of America',
        accountNumber: '1029384756',
        routingNumber: '021000021',
        accountType: 'Checking Account',
        updatedAt: member.regDate
      }
    };
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const currentDateTime = () => {
      const pad = (num) => String(num).padStart(2, '0');
      const now = new Date();
      return `${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${now.getFullYear()} :: ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    };

    const newComment = {
      status: commentStatus,
      comments: commentText,
      dateTime: currentDateTime()
    };

    // Add to comments history
    setCommentsHistory(prev => ({
      ...prev,
      [selectedMember.sNo]: [newComment, ...(prev[selectedMember.sNo] || [])]
    }));

    // Update member status in main list state
    setMembersList(prevList => prevList.map(m => {
      if (m.sNo === selectedMember.sNo) {
        return {
          ...m,
          status: commentStatus,
          statusDate: currentDateTime()
        };
      }
      return m;
    }));

    // Update selectedMember state to refresh UI
    setSelectedMember(prev => ({
      ...prev,
      status: commentStatus,
      statusDate: currentDateTime()
    }));

    setCommentText('');
  };

  const detailTabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'spouse', label: 'Spouse Info' },
    { id: 'dependent', label: 'Dependent Info' },
    { id: 'bank', label: 'Bank Details' },
    { id: 'address', label: 'Address' },
    { id: 'download', label: 'Download' },
    { id: 'interview', label: 'Interview' },
    { id: 'pay', label: 'Pay' },
    { id: 'upload', label: 'Upload' },
    { id: 'fileInfo', label: 'File Info' }
  ];

  const workflowStatuses = [
    'Registered Users',
    'Scheduling Pending',
    'Information Pending',
    'Interview Pending',
    'Documents Pending',
    'Preparation - 1',
    'Preparation - 2',
    'Review & Summary 1',
    'Review & Summary 2',
    'Payment Pending - Efiling',
    'Payable Pending - Paper Filing',
    'Fee Payment Received - 1',
    'Fee Payment Received - 2',
    'Client Review - Efiling',
    'Client Review - Paper Filing',
    'Efiling Pending - 1',
    'Efiling Pending - 2',
    'E - Filed & Awaiting Acceptance - 1',
    'E - Filed & Awaiting Acceptance - 2',
    'E - Filed & Rejected',
    'City Return',
    'E-Filing Accepted & Filing Complete',
    'Paper Filing Pending',
    'Paper Filing Accepted & Complete',
    'Cancelled'
  ];

  // numericYear is declared at the top of the component

  const getTotalCount = () => {
    switch (selectedStatus) {
      case 'payment-pending-efiling': return 670;
      case 'payable-pending-paper-filing': return 25;
      case 'fee-payment-received-1': return 0;
      case 'fee-payment-received-2': return 13;
      case 'client-review-efiling': return 30;
      case 'client-review-paper-filing': return 1;
      case 'just-uploaded-docs': return 0;
      default: return filteredMembers.length + 4931;
    }
  };

  const renderPagination = () => {
    let pageLinks = null;
    let showingText = `Showing 1 to ${filteredMembers.length} of ${filteredMembers.length} entries`;

    if (selectedStatus === 'payment-pending-efiling') {
      pageLinks = (
        <div className="pagination-row">
          <button className="page-link-btn active">1</button>
          <button className="page-link-btn">2</button>
          <button className="page-link-btn">3</button>
          <button className="page-link-btn">&gt;</button>
          <button className="page-link-btn">Last</button>
        </div>
      );
      showingText = "Showing 1 to 20 of 670 entries";
    } else if (selectedStatus === 'payable-pending-paper-filing') {
      pageLinks = (
        <div className="pagination-row">
          <button className="page-link-btn active">1</button>
          <button className="page-link-btn">2</button>
          <button className="page-link-btn">&gt;</button>
        </div>
      );
      showingText = "Showing 1 to 20 of 25 entries";
    } else if (selectedStatus === 'fee-payment-received-2') {
      showingText = "Showing 1 to 13 of 13 entries";
    } else if (selectedStatus === 'fee-payment-received-1') {
      showingText = "Showing 0 to 0 of 0 entries";
    } else if (selectedStatus === 'client-review-efiling') {
      pageLinks = (
        <div className="pagination-row">
          <button className="page-link-btn active">1</button>
          <button className="page-link-btn">2</button>
          <button className="page-link-btn">&gt;</button>
        </div>
      );
      showingText = "Showing 1 to 20 of 30 entries";
    } else if (selectedStatus === 'client-review-paper-filing') {
      showingText = "Showing 1 to 1 of 1 entries";
    } else if (selectedStatus === 'just-uploaded-docs') {
      showingText = "Showing 0 to 0 of 0 entries";
    } else {
      pageLinks = (
        <div className="pagination-row">
          <button className="page-link-btn active">1</button>
          <button className="page-link-btn">2</button>
          <button className="page-link-btn">3</button>
          <button className="page-link-btn">&gt;</button>
          <button className="page-link-btn">Last</button>
        </div>
      );
      showingText = `Showing 1 to ${filteredMembers.length} of ${filteredMembers.length} entries`;
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
        {pageLinks}
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          {showingText}
        </div>
      </div>
    );
  };

  return (
    <div className="content-card">
      <div className="header-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{getHeaderTitle()}</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            type="date" 
            className="date-picker-box"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>
      </div>

      {/* Ribbon toolbar */}
      <div className="table-filter-bar">
        <div className="filter-left-pill-group">
          <button 
            className="pill-btn new-members"
            onClick={() => setActiveSubTab('New')}
            style={{ border: activeSubTab === 'New' ? '2px solid black' : 'none' }}
          >
            New Registered Members
          </button>
          <button 
            className="pill-btn modified-members"
            onClick={() => setActiveSubTab('Modified')}
            style={{ border: activeSubTab === 'Modified' ? '2px solid black' : 'none' }}
          >
            Last modified Members
          </button>
          <span className="pill-badge">Total {getTotalCount()}</span>
        </div>

        <div className="filter-right-inputs">
          {!selectedMember && (
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                className="search-input-box" 
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Excel Download cards */}
      <div className="excel-btn-group">
        <button className="excel-download-btn-card" onClick={() => handleExport(`except-${numericYear}`)}>
          <span className="excel-btn-top">⬇ Excel</span>
          <span className="excel-btn-bottom">Note: Download All members except {numericYear} Year</span>
        </button>
        <button className="excel-download-btn-card" onClick={() => handleExport(`${numericYear}-only`)}>
          <span className="excel-btn-top">⬇ Excel</span>
          <span className="excel-btn-bottom">Note: Download All Members {numericYear} Year Only</span>
        </button>
      </div>

      {selectedMember ? (
        /* ==================== INLINE DETAIL VIEW WORKSPACE ==================== */
        <div className="detail-view-container" style={{ animation: 'fadeIn 0.2s ease-out' }}>
          <button 
            className="detail-back-btn" 
            onClick={() => {
              setSelectedMember(null);
              setActiveDetailTab('personal');
            }}
          >
            Back
          </button>

          {/* Horizonal 10 tabs ribbon row */}
          <div className="detail-tabs-row">
            {detailTabs.map(tab => (
              <button
                key={tab.id}
                className={`detail-tab-btn ${activeDetailTab === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveDetailTab(tab.id);
                  if (tab.id === 'fileInfo') {
                    setCommentStatus(selectedMember.status);
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Panel Body */}
          <div className="detail-tab-panel" style={{ marginTop: '16px' }}>
            {(() => {
              const details = getMemberDetails(selectedMember);
              if (!details) return null;

              switch (activeDetailTab) {
                case 'personal':
                  const personalRows = [
                    { label: 'FIRST NAME', value: '' },
                    { label: 'FIRST NAME', value: details.personal.firstName },
                    { label: 'MIDDLE NAME', value: details.personal.middleName },
                    { label: 'LAST NAME', value: details.personal.lastName },
                    { label: 'CONTACT NUMBER', value: details.personal.contactNumber, isMasked: true, fieldKey: `${selectedMember.sNo}_phone` },
                    { label: 'ALTERNATE NUMBER', value: details.personal.alternateNumber },
                    { label: 'TIME ZONE', value: details.personal.timeZone },
                    { label: 'SSN', value: details.personal.ssn },
                    { label: 'DOB', value: details.personal.dob },
                    { label: 'EMPLOYER', value: details.personal.employer },
                    { label: 'GENDER', value: details.personal.gender },
                    { label: 'OCCUPATION', value: details.personal.occupation },
                    { label: 'VISA TYPE', value: details.personal.visaType },
                    { label: 'EMAIL', value: details.personal.email, isMasked: true, fieldKey: `${selectedMember.sNo}_personal_email` },
                    { label: 'ADDRESS', value: details.personal.address },
                    { label: 'CITY', value: details.personal.city },
                    { label: 'STATE', value: details.personal.state },
                    { label: 'ZIPCODE', value: details.personal.zipcode },
                    { label: 'FILING STATUS', value: details.personal.filingStatus },
                    { label: 'FILING TYPE', value: details.personal.filingType },
                    { label: 'FIRST ENTRY DATE INTO USA', value: details.personal.firstEntry },
                    { label: 'DATE OF MARRIAGE', value: details.personal.marriageDate },
                    { label: 'HAVE YOU BEEN REFERRED?', value: details.personal.referred },
                    { label: 'FULL NAME', value: details.personal.referredName },
                    { label: 'EMAIL ID', value: details.personal.referredEmail },
                    { label: 'UPDATED DATE & TIME', value: details.personal.updatedAt }
                  ];

                  return (
                    <div className="table-responsive">
                      <table className="corporate-table detail-card-table">
                        <thead>
                          <tr>
                            <th colSpan="2" style={{ textAlign: 'left', fontWeight: 'bold' }}>PERSONAL DETAILS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {personalRows.map((row, idx) => (
                            <tr key={idx}>
                              <td style={{ width: '30%', fontWeight: '600', color: 'var(--text-muted)' }}>{row.label}</td>
                              <td>
                                {row.isMasked ? (
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>
                                      {unmaskedFields[row.fieldKey] 
                                        ? row.value 
                                        : (row.label.includes('EMAIL') ? 'XXXXXXXXX.COM' : 'XXXXXXXXXX')}
                                    </span>
                                    <button 
                                      type="button"
                                      className="email-toggle-eye-btn" 
                                      onClick={() => handleFieldClick(row.fieldKey, row.value, !!unmaskedFields[row.fieldKey])}
                                      title={unmaskedFields[row.fieldKey] ? 'Mask Field' : 'Show Field'}
                                    >
                                      <Eye size={14} />
                                    </button>
                                  </div>
                                ) : (
                                  row.value
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );

                case 'spouse':
                  const spouseRows = [
                    { label: 'FIRST NAME', value: details.spouse.firstName },
                    { label: 'MIDDLE NAME', value: details.spouse.middleName },
                    { label: 'LAST NAME', value: details.spouse.lastName },
                    { label: 'SSN', value: details.spouse.ssn },
                    { label: 'DOB', value: details.spouse.dob },
                    { label: 'OCCUPATION', value: details.spouse.occupation },
                    { label: 'VISA TYPE', value: details.spouse.visaType },
                    { label: 'TAX ID TYPE', value: details.spouse.taxIdType },
                    { label: 'PASSPORT NUMBER', value: details.spouse.passportNumber },
                    { label: 'PASSPORT EXPIRY DATE', value: details.spouse.passportExpiry },
                    { label: 'VISA NUMBER', value: details.spouse.visaNumber },
                    { label: 'VISA EXPIRY DATE', value: details.spouse.visaExpiry },
                    { label: 'USA ENTRY', value: details.spouse.usaEntry },
                    { label: 'UPDATE DATE & TIME', value: details.spouse.updatedAt }
                  ];

                  return (
                    <div className="table-responsive">
                      <table className="corporate-table detail-card-table">
                        <thead>
                          <tr>
                            <th colSpan="2" style={{ textAlign: 'left', fontWeight: 'bold' }}>SPOUSE DETAILS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {spouseRows.map((row, idx) => (
                            <tr key={idx}>
                              <td style={{ width: '30%', fontWeight: '600', color: 'var(--text-muted)' }}>{row.label}</td>
                              <td>{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );

                case 'dependent':
                  return (
                    <div className="table-responsive">
                      <table className="corporate-table">
                        <thead>
                          <tr>
                            <th>S.NO</th>
                            <th>NAME</th>
                            <th>SSN/ITIN</th>
                            <th>RELATIONSHIP</th>
                            <th>DATE OF BIRTH</th>
                            <th>VISA TYPE</th>
                            <th>UPDATED DATE</th>
                            <th>SHOW</th>
                          </tr>
                        </thead>
                        <tbody>
                          {details.dependents && details.dependents.length > 0 ? (
                            details.dependents.map((dep, idx) => (
                              <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td style={{ fontWeight: '500' }}>{dep.name}</td>
                                <td>{dep.ssn}</td>
                                <td>{dep.relationship}</td>
                                <td>{dep.dob}</td>
                                <td>{dep.visa}</td>
                                <td style={{ color: 'var(--text-muted)' }}>{dep.updated}</td>
                                <td>
                                  <button 
                                    className="btn-view-action"
                                    style={{ padding: '4px 8px', fontSize: '11px' }}
                                    onClick={() => alert(`Viewing dependent details: ${dep.name}`)}
                                  >
                                    CLICK TO VIEW
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic', padding: '16px' }}>
                                No Dependent details listed for this member.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  );

                case 'bank':
                  return (
                    <div className="bank-details-card" style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', backgroundColor: '#ffffff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 'bold', margin: 0, color: 'var(--text-dark)' }}>Bank Details</h3>
                        <button 
                          type="button"
                          className="btn" 
                          style={{ 
                            backgroundColor: '#3ea94f', 
                            color: '#ffffff', 
                            border: 'none', 
                            padding: '6px 12px', 
                            fontSize: '12px', 
                            fontWeight: 'bold', 
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer'
                          }}
                          onClick={() => alert('Bank Details editor simulated successfully.')}
                        >
                          ✏ Edit Bank Details
                        </button>
                      </div>
                      <div className="table-responsive">
                        <table className="corporate-table">
                          <tbody>
                            <tr>
                              <td style={{ fontWeight: 'bold', width: '25%', color: 'var(--text-muted)' }}>Bank Name</td>
                              <td>{details.bank.bankName}</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>Bank Accout Number</td>
                              <td>{details.bank.accountNumber}</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>Bank Routing Number</td>
                              <td>{details.bank.routingNumber}</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>Acccount Type</td>
                              <td>{details.bank.accountType}</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>Updated Date</td>
                              <td>{details.bank.updatedAt}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );

                case 'address':
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: 'var(--radius-sm)', backgroundColor: '#ffffff' }}>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Current Address Details</h4>
                        <p style={{ fontSize: '13px', margin: 0 }}><strong>Street Address:</strong> {details.personal.address || '36163 FREMONT BLVD APT 10'}</p>
                        <p style={{ fontSize: '13px', margin: '4px 0' }}><strong>City:</strong> {details.personal.city || 'FREMONT'}, <strong>State:</strong> {details.personal.state || 'CA'} - {details.personal.zipcode || '94536'}</p>
                        <p style={{ fontSize: '13px', margin: 0 }}><strong>Country:</strong> United States</p>
                      </div>
                      <div style={{ border: '1px solid var(--border-light)', padding: '16px', borderRadius: 'var(--radius-sm)', backgroundColor: '#ffffff' }}>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Mailing Address Details</h4>
                        <p style={{ fontSize: '13px', margin: 0, fontStyle: 'italic', color: 'var(--text-muted)' }}>Same as Current Address</p>
                      </div>
                    </div>
                  );

                case 'download':
                  return (
                    <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', backgroundColor: '#ffffff' }}>
                      <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Available Client Documents</h4>
                      <div className="table-responsive">
                        <table className="corporate-table">
                          <thead>
                            <tr>
                              <th>Document Name</th>
                              <th>Category</th>
                              <th>Uploaded Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Form_1040_Draft_v1.pdf</td>
                              <td>Tax returns</td>
                              <td>2026-06-11</td>
                              <td><button className="btn-view-action" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => alert('Simulating PDF download...')}>Download</button></td>
                            </tr>
                            <tr>
                              <td>W2_Employer_Copy.pdf</td>
                              <td>Income Source</td>
                              <td>2026-06-05</td>
                              <td><button className="btn-view-action" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => alert('Simulating W-2 download...')}>Download</button></td>
                            </tr>
                            <tr>
                              <td>Passport_DriverLicense.pdf</td>
                              <td>Identity Verification</td>
                              <td>2026-06-05</td>
                              <td><button className="btn-view-action" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => alert('Simulating Document download...')}>Download</button></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );

                case 'interview':
                  return (
                    <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', backgroundColor: '#ffffff' }}>
                      <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Interview Scheduling Info</h4>
                      <div className="table-responsive">
                        <table className="corporate-table">
                          <tbody>
                            <tr>
                              <td style={{ fontWeight: 'bold', width: '25%', color: 'var(--text-muted)' }}>Coordinator</td>
                              <td>Nagasri K.</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>Schedule Type</td>
                              <td>Phone Interview (USA)</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>Scheduled Time</td>
                              <td>2026-06-20 at 10:00 AM EST</td>
                            </tr>
                            <tr>
                              <td style={{ fontWeight: 'bold', color: 'var(--text-muted)' }}>Interview Status</td>
                              <td><span style={{ backgroundColor: '#fff3cd', color: '#856404', padding: '4px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>Scheduled</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );

                case 'pay':
                  return (
                    <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', backgroundColor: '#ffffff' }}>
                      <h4 style={{ fontWeight: 'bold', marginBottom: '12px', fontSize: '14px' }}>Billing & Invoices</h4>
                      <div className="table-responsive">
                        <table className="corporate-table">
                          <thead>
                            <tr>
                              <th>Invoice No</th>
                              <th>Amount</th>
                              <th>Payment Status</th>
                              <th>Payment Date</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>INV-2026-901</td>
                              <td>$150.00</td>
                              <td><span style={{ color: 'var(--color-darkgreen-btn)', fontWeight: 'bold' }}>PAID</span></td>
                              <td>2026-06-05</td>
                              <td><button className="btn-view-action" style={{ padding: '4px 8px', fontSize: '12px' }} onClick={() => alert('Simulating Receipt receipt generation...')}>Receipt</button></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );

                case 'upload':
                  return (
                    <div style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', backgroundColor: '#ffffff', textAlign: 'center' }}>
                      <h4 style={{ fontWeight: 'bold', marginBottom: '12px', textAlign: 'left', fontSize: '14px' }}>Upload Member Document</h4>
                      <div 
                        style={{ border: '2px dashed #ccc', padding: '40px 20px', borderRadius: 'var(--radius-sm)', backgroundColor: '#f9f9f9', cursor: 'pointer' }}
                        onClick={() => alert('Local system file dialog opened.')}
                      >
                        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>Drag & Drop files here, or click to select files from your computer</p>
                        <span style={{ fontSize: '11px', color: '#999' }}>Supported formats: PDF, JPEG, PNG, TIFF (Max: 10MB)</span>
                      </div>
                    </div>
                  );

                case 'fileInfo':
                  const history = commentsHistory[selectedMember.sNo] || [
                    { status: selectedMember.status, comments: 'Initial registration processed.', dateTime: selectedMember.regDate }
                  ];

                  return (
                    <div className="file-info-view" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {/* Comments logging form */}
                      <form onSubmit={handleCommentSubmit} style={{ border: '1px solid var(--border-light)', padding: '20px', borderRadius: 'var(--radius-sm)', backgroundColor: '#ffffff' }}>
                        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                          <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>File No</label>
                            <input 
                              type="text" 
                              className="search-input-box" 
                              style={{ width: '100%', backgroundColor: '#e9ecef', cursor: 'not-allowed' }}
                              value={selectedMember.fileNo} 
                              disabled 
                            />
                          </div>

                          <div style={{ flex: '1', minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>File in Type</label>
                            <select 
                              className="search-input-box" 
                              style={{ width: '100%' }}
                              value={selectedMember.filingType}
                              onChange={(e) => {
                                const val = e.target.value;
                                setMembersList(prev => prev.map(m => m.sNo === selectedMember.sNo ? { ...m, filingType: val } : m));
                                setSelectedMember(prev => ({ ...prev, filingType: val }));
                              }}
                            >
                              <option value="E-Filing">E-Filing</option>
                              <option value="Paper Filing">Paper Filing</option>
                            </select>
                          </div>

                          <div style={{ flex: '1.5', minWidth: '250px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '12px', fontWeight: 'bold' }}>File Status</label>
                            <select 
                              className="search-input-box" 
                              style={{ width: '100%' }}
                              value={commentStatus}
                              onChange={(e) => setCommentStatus(e.target.value)}
                            >
                              {workflowStatuses.map((stat, idx) => (
                                <option key={idx} value={stat}>{stat}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Comments</label>
                          <textarea 
                            rows="4" 
                            className="search-input-box" 
                            style={{ width: '100%', height: 'auto', fontFamily: 'inherit' }}
                            placeholder="Enter administrative workflow update notes..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            required
                          />
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button 
                            type="submit" 
                            className="btn btn-primary"
                            style={{ backgroundColor: '#3ea94f', padding: '8px 20px', border: 'none', fontWeight: 'bold' }}
                          >
                            Submit
                          </button>
                          <button 
                            type="button" 
                            className="btn btn-secondary"
                            style={{ padding: '8px 20px', fontWeight: 'bold' }}
                            onClick={() => {
                              setCommentText('');
                              setCommentStatus(selectedMember.status);
                            }}
                          >
                            Reset
                          </button>
                        </div>
                      </form>

                      {/* Comments history table */}
                      <div className="table-responsive">
                        <table className="corporate-table">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Status</th>
                              <th>Comments</th>
                              <th>Date &amp; Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {history.map((c, idx) => (
                              <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>
                                  <span style={{ 
                                    color: c.status.includes('Complete') ? 'var(--color-darkgreen-btn)' : 
                                           c.status.includes('Pending') ? '#856404' : '#212529',
                                    fontWeight: c.status.includes('Complete') ? 'bold' : 'normal'
                                  }}>
                                    {c.status}
                                  </span>
                                </td>
                                <td>{c.comments}</td>
                                <td style={{ color: 'var(--text-muted)', fontSize: '12px' }}>{c.dateTime}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );

                default:
                  return null;
              }
            })()}
          </div>
        </div>
      ) : (
        /* ==================== NORMAL MEMBERS LIST VIEW ==================== */
        <>
          <div className="table-responsive" style={{ animation: 'fadeIn 0.2s ease-out' }}>
            <table className="corporate-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>File No</th>
                  <th>Filing Type</th>
                  <th>E-mail</th>
                  <th>Register date</th>
                  <th>File Status</th>
                  <th>Status Updated Date</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member, idx) => (
                  <tr key={member.sNo}>
                    <td>{idx + 1}</td>
                    <td style={{ fontWeight: '500' }}>{member.name}</td>
                    <td>{member.fileNo}</td>
                    <td>{member.filingType}</td>
                    <td>
                      <div className="email-cell-container">
                        <span>
                          {unmaskedFields[`${member.sNo}_email`] 
                            ? member.email 
                            : getMaskedEmail(member.email)}
                        </span>
                        <button 
                          className="email-toggle-eye-btn" 
                          onClick={() => handleFieldClick(`${member.sNo}_email`, member.email, !!unmaskedFields[`${member.sNo}_email`])}
                          title={unmaskedFields[`${member.sNo}_email`] ? 'Mask Email' : 'Show Email'}
                        >
                          <Eye size={14} />
                        </button>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{member.regDate}</td>
                    <td>
                      <span style={{ 
                        color: member.status.includes('Complete') ? 'var(--color-darkgreen-btn)' : 
                               member.status.includes('Pending') ? '#856404' : '#212529',
                        fontWeight: member.status.includes('Complete') ? 'bold' : 'normal'
                      }}>
                        {member.status}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{member.statusDate}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button className="btn-view-action" onClick={() => setSelectedMember(member)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {renderPagination()}
        </>
      )}

      {/* OTP verification Modal for unmasking fields */}
      {showOtpModal && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ width: '400px' }}>
            <div className="modal-header">
              <h3 className="modal-title">Verification Code Required</h3>
              <button 
                className="modal-close-trigger" 
                onClick={() => setShowOtpModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body" style={{ padding: '20px' }}>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
                For security, enter the 6-digit verification code below to reveal this field:
              </p>
              <div 
                style={{ 
                  textAlign: 'center', 
                  backgroundColor: '#f8f9fa', 
                  padding: '12px', 
                  borderRadius: 'var(--radius-sm)', 
                  fontSize: '18px', 
                  fontWeight: 'bold', 
                  letterSpacing: '2px',
                  marginBottom: '16px',
                  border: '1px dashed #ccc',
                  color: 'var(--text-dark)'
                }}
              >
                Code: {verificationOtp}
              </div>
              
              {otpError && (
                <div style={{ color: '#dc3545', fontSize: '13px', marginBottom: '12px', backgroundColor: 'rgba(220, 53, 69, 0.1)', padding: '8px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(220, 53, 69, 0.2)' }}>
                  {otpError}
                </div>
              )}

              <div className="form-group">
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Enter 6-digit code"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  style={{ 
                    padding: '10px', 
                    textAlign: 'center', 
                    fontSize: '16px', 
                    letterSpacing: '1px' 
                  }}
                  maxLength={6}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary" 
                style={{ padding: '8px 16px' }}
                onClick={() => setShowOtpModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                style={{ padding: '8px 16px', backgroundColor: 'var(--bg-navbar)' }}
                onClick={() => {
                  if (otpInput === verificationOtp) {
                    setUnmaskedFields(prev => ({
                      ...prev,
                      [verificationFieldKey]: true
                    }));
                    setShowOtpModal(false);
                  } else {
                    setOtpError('Invalid code. Please try again.');
                  }
                }}
              >
                Verify &amp; Show
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

