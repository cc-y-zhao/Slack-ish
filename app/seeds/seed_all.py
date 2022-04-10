from app.models import db, User
from app.models import db, Channel
from app.models import db, Message


def seed_all():
    # seed_users():
    channel1 = Channel(
        title='Welcome', is_dm=False, description='We are cloning Slack!')

    channel_aa = Channel(
        title='2021-11-15-online', is_dm=False, description='The best cohort EVER!')

    demo = User(
        first_name='App', last_name='Academy', email='demo@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://assets-global.website-files.com/5dcc7f8c449e597ed83356b8/603820afd31232aab368ea6f_New%20Red-logo-emblem.png')
    sharon = User(
        first_name='Sharon', last_name='Fang', email='sharon@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://pbs.twimg.com/media/EbSfCHFU8AEimfk.jpg')
    gabriel = User(
        first_name='Gabriel', last_name='Sitorus', email='gabriel@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://media-exp1.licdn.com/dms/image/D5603AQHYi5RD9DFdKA/profile-displayphoto-shrink_200_200/0/1647206013202?e=1654732800&v=beta&t=kWWvntvsst9HwJikcrAKGe8fSr3-caSoOAVG2cW8MM8')
    cecilia = User(
        first_name='Cecilia', last_name='Zhao', email='cecilia@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02D2PVAF5W-41109fd1a78b-72')
    ali = User(
        first_name='Ali', last_name='Naqvi', email='alinaqvi@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02M7CUG2E8-a35a28993c71-512')
    anabel = User(
        first_name='Anabel', last_name='Villalobos', email='anabelvillalobos@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02AP1CSQH2-826e8ff06bd6-512')
    angel = User(
        first_name='Angel', last_name='Wei', email='angelwei@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02LJUW4F7Y-3ef2415df6ef-512')
    anthony = User(
        first_name='Anthony', last_name='Arellano', email='anthonyarellano@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02K0LTJL9X-39fe707e5cef-512')
    blake = User(
        first_name='Blake', last_name='Watts', email='blakewatts@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02KNM4AWBX-79711adf995d-512')
    braxton = User(
        first_name='Braxton', last_name='Kappes', email='braxton@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02BVBJH2S2-e2b79d703e93-512')
    breakbot = User(
        first_name='Break', last_name='Bot', email='break@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U015BUWSSP4-ade0b4e03cd6-512')
    carlos = User(
        first_name='Carlos', last_name='Rodriguez', email='carlosr@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02AYC35PM3-c5e0764ac39f-512')
    chris_britton = User(
        first_name='Chris', last_name='Britton', email='chrisbritton@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02ETG92XR7-29398ecba4ef-512')
    chris_tsang = User(
        first_name='Chris', last_name='Tsang', email='christsang@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02L3SMLEN7-57e0f1a685e0-512')
    dan_chin = User(
        first_name='Dan', last_name='Chin', email='danchin@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U016USJG719-44a98f4a98df-512')
    caleb = User(
        first_name='Caleb', last_name='Braaten', email='caleb@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U01SH02QNCV-514081bd2fde-512')
    dan_purcell = User(
        first_name='Dan', last_name='Purcell', email='danpurcell@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U0327LT9U5S-f1862c6cb1e0-512')
    dan_llano = User(
        first_name='Daniel Caicedo', last_name='Llano', email='danllano@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02H0EJB0BD-g81e68ca12a1-512')
    david_pham = User(
        first_name='David', last_name='Pham', email='davidpham@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02BYKFQ6RJ-263d9ebf8a8d-512')
    drew = User(
        first_name='Drew', last_name='Thurman', email='drewthurman@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U01D8FV3L12-800f94980f0b-512')
    ian = User(
        first_name='Ian', last_name='Edwards', email='ian@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02LTTE76BE-05305a426bef-512')
    jacob_north = User(
        first_name='Jacob', last_name='North', email='jacobnorth@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02LTEGD7QQ-0127464baf1c-512')
    jason_li = User(
        first_name='Jason', last_name='Li', email='jasonli@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02LZMM2D6Z-d6aebdd3789d-512')
    jesse = User(
        first_name='Jesse', last_name='Christensen', email='jesse@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02HG51FH1N-6e6a42aa2ae4-512')
    john_lee = User(
        first_name='John', last_name='Lee', email='johnlee@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02B40U483B-6234378fd9c5-512')
    jojo = User(
        first_name='Jojo', last_name='Yi', email='jojo@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U01TNA5TKCY-026d12c6195d-512')
    jonathan_hsu = User(
        first_name='Jonathan', last_name='Hsu', email='jonhsu@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02J0V9VBR7-306c94cec8fb-512')
    johnny_san = User(
        first_name='Johnny', last_name='San', email='johnnysan@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02L4RJ63PG-e9fa97bc8425-512')
    junki = User(
        first_name='Junki', last_name='Sato', email='junki@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02HXPFKFS7-4ab666e16d86-512')
    kevinm = User(
        first_name='Kevin', last_name='Pravia Mayorga', email='kevinmay@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02BCG7L4SE-gf1954913452-512')
    leah = User(
        first_name='Leah', last_name='Kim', email='leah@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U029LA8398A-c5364722b19a-512')
    leo = User(
        first_name='Leo', last_name='Troper', email='leo@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02MUSP6E3S-2d0b9e041de1-512')
    luke = User(
        first_name='Luke', last_name='Yamasaki', email='luke@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02E6E0SYRF-1dc0a85cec27-512')
    madi = User(
        first_name='Madi', last_name='Lippmann', email='madi@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02MFBHFTL0-566a9ce85f68-512')
    mattp = User(
        first_name='Matt', last_name='Puerta', email='mattp@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02BJN0PE3E-g9c58bd5438a-512')
    morgan = User(
        first_name='Morgan', last_name='Gravelat', email='morgan@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02HKGRDU12-8e3e03b5a276-512')
    nick = User(
        first_name='Nick', last_name='Esqueda', email='nicke@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02L126CTV2-e6485299f71b-512')
    nicka = User(
        first_name='Nick', last_name='Austin', email='nicka@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02BRJQ55KL-g01f9a2e854e-512')
    nik = User(
        first_name='Nikolas', last_name='Garza', email='nik@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02GZ82V8LC-cc41f2bbd0fb-512')
    parth = User(
        first_name='Parth', last_name='Bhakta', email='parth@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02DVPCFSDC-2f42b255bc03-512')
    paul = User(
        first_name='Paul', last_name='Oh', email='paul@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02DVACQES3-b7ad0bf75a28-512')
    phil = User(
        first_name='Philip', last_name='Roberts', email='phil@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02GX2ULED9-gf3b04cf20f9-512')
    rawaha = User(
        first_name='Rawaha', last_name='Memon', email='rawaha@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U020YTZ7B7C-239122bb7805-512')
    ryan = User(
        first_name='Ryan', last_name='Kagrise', email='ryank@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02LM6XM1AT-ccf699015ffd-512')
    shams = User(
        first_name='Shams', last_name='Shaikh', email='shams@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02M39AHD40-4e5f0c9c7b67-512')
    sherry = User(
        first_name='Sherry', last_name='Yu', email='sherry@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U022ZK9BTT4-a218fba7aeb3-512')
    ty = User(
        first_name='Ty', last_name='Rickers', email='ty@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02KSE566QZ-50d07ec96f7f-512')
    wan = User(
        first_name='Wan-Yi', last_name='Lee', email='wan@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02A519D64D-gf58e5ad745b-512')
    will = User(
        first_name='Will', last_name='Kee', email='will@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02LDJXLQE7-5dcc1b6e6d30-512')
    woo = User(
        first_name='Wooyoung', last_name='Kim', email='woo@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02EYF6JLQZ-g4acee944568-512')
    yavuz = User(
        first_name='Yavuz', last_name='Abasiyanik', email='yavuz@aa.io', password='password', channels=[channel1, channel_aa], image_url='https://ca.slack-edge.com/T03GU501J-U02GQ7RLNBD-bd4153d3cc3a-512')

    db.session.add(demo)
    db.session.add(sharon)
    db.session.add(gabriel)
    db.session.add(cecilia)
    db.session.add(ali)
    db.session.add(anabel)
    db.session.add(angel)
    db.session.add(anthony)
    db.session.add(blake)
    db.session.add(braxton)
    db.session.add(breakbot)
    db.session.add(carlos)
    db.session.add(chris_britton)
    db.session.add(chris_tsang)
    db.session.add(dan_chin)
    db.session.add(caleb)
    db.session.add(dan_purcell)
    db.session.add(dan_llano)
    db.session.add(david_pham)
    db.session.add(drew)
    db.session.add(ian)
    db.session.add(jacob_north)
    db.session.add(jason_li)
    db.session.add(jesse)
    db.session.add(john_lee)
    db.session.add(jojo)
    db.session.add(jonathan_hsu)
    db.session.add(johnny_san)
    db.session.add(junki)
    db.session.add(kevinm)
    db.session.add(leah)
    db.session.add(leo)
    db.session.add(luke)
    db.session.add(madi)
    db.session.add(mattp)
    db.session.add(morgan)
    db.session.add(nick)
    db.session.add(nicka)
    db.session.add(nik)
    db.session.add(parth)
    db.session.add(paul)
    db.session.add(phil)
    db.session.add(rawaha)
    db.session.add(ryan)
    db.session.add(shams)
    db.session.add(sherry)
    db.session.add(ty)
    db.session.add(wan)
    db.session.add(will)
    db.session.add(woo)
    db.session.add(yavuz)

    db.session.flush()

    # seed_channels():
    channel2 = Channel(
        owner_id='1', title='App Academy', is_dm=False, description='This is BootCAMP!')
    channel3 = Channel(
        owner_id='1', title='Just For Funsies', is_dm=False, description='Slackin\' around!')
    channel4 = Channel(
        owner_id='2', title='RIOT', is_dm=False, description='Sharon loves Riot Games')
    channel5 = Channel(
        owner_id='3', title='Interview Prep', is_dm=False, description='Gabe\'s Interview Preppers')
    channel6 = Channel(
        owner_id='4', title='Cecilia\'s Corner', is_dm=False, description='Welcome to Cecilia\'s Corner!')

    db.session.add(channel1)
    db.session.add(channel_aa)
    db.session.add(channel2)
    db.session.add(channel3)
    db.session.add(channel4)
    db.session.add(channel5)
    db.session.add(channel6)

    # seed_dms():
    dms1 = Channel(
        title='App Academy, Cecilia Zhao', is_dm=True)
    dms2 = Channel(
        title='App Academy, Gabriel Sitorus', is_dm=True)
    dms3 = Channel(
        title='App Academy, Sharon Fang', is_dm=True)

    db.session.add(dms1)
    db.session.add(dms2)
    db.session.add(dms3)

    # seed_messages():
    message1 = Message(
        user_id='1', channel_id='1', content='Hey everyone!')
    message2 = Message(
        user_id='3', channel_id='1', content='Hello...')
    message3 = Message(
        user_id='2', channel_id='1', content='What is UP!')
    message4 = Message(
        user_id='4', channel_id='1', content='I have two cats and they are adorable')
    message5 = Message(
        user_id='1', channel_id='2', content='App Academy is cool')
    message6 = Message(
        user_id='3', channel_id='6', content='Interview prep is hard!')
    message7 = Message(
        user_id='2', channel_id='2', content='I totally agree! This is awesome possum!')
    message8 = Message(
        user_id='4', channel_id='6', content='We got this!')
    message9 = Message(
        user_id='2', channel_id='4', content='I love Riot Games')
    message10 = Message(
        user_id='4', channel_id='7', content='Welcome to my corner!')
    message11 = Message(
        user_id='5', channel_id='5', content='ayo blake and braxton lets get a 5 man val game going')
    message12 = Message(
        user_id='23', channel_id='5', content='anyone tft ?')
    message13 = Message(
        user_id='26', channel_id='5', content='aram pl0x')
    message_sharon = Message(
        user_id='2', channel_id='5', content='RITO PLS')
    message14 = Message(
        user_id='11', channel_id='2', content='@channel Today might feel like an infinite loop, but good thing we have a break now!')
    message15 = Message(
        user_id='16', channel_id='2', content='This is the best cohort App Academy has ever had!')
    message16 = Message(
        user_id='20', channel_id='2', content='^Definitely!!!')
    message17 = Message(
        user_id='8', channel_id='2', content='let me serenade you all with my latest single')
    message18 = Message(
        user_id='37', channel_id='2', content='sing to me anthony')
    message19 = Message(
        user_id='18', channel_id='2', content='curly boys')
    message_blake = Message(
        user_id='9', channel_id='2', content='^')
    message20 = Message(
        user_id='45', channel_id='2', content='Not sure how and when brackets became "boys"')
    message21 = Message(
        user_id='5', channel_id='2', content='curly bois')
    message22 = Message(
        user_id='41', channel_id='2', content='does anyone want any peanuts?')
    message_nick = Message(
        user_id='37', channel_id='1', content='I have a question... idk how to ask it tho...')
    message23 = Message(
        user_id='45', channel_id='1', content='Asking questions is crucial for winning cahoots, watch and learn bruh')
    message24 = Message(
        user_id='45', channel_id='1', content='kahoots')
    message25 = Message(
        user_id='17', channel_id='1', content='I used to be a wall street bro')
    message26 = Message(
        user_id='4', channel_id='2', content="Yeah I'll have some")
    message27 = Message(
        user_id='42', channel_id='2', content="🥜🥜🥜")
    message28 = Message(
        user_id='37', channel_id='2', content="hoot")
    message29 = Message(
        user_id='37', channel_id='2', content="blz")
    message30 = Message(
        user_id='51', channel_id='2', content="cant see breakout rooms")
    message31 = Message(
        user_id='16', channel_id='2', content="How about now? They should be open now..")
    message32 = Message(
        user_id='51', channel_id='2', content="no")

    db.session.add(message1)
    db.session.add(message2)
    db.session.add(message3)
    db.session.add(message4)
    db.session.add(message5)
    db.session.add(message6)
    db.session.add(message7)
    db.session.add(message8)
    db.session.add(message9)
    db.session.add(message10)
    db.session.add(message11)
    db.session.add(message12)
    db.session.add(message13)
    db.session.add(message_sharon)
    db.session.add(message14)
    db.session.add(message15)
    db.session.add(message16)
    db.session.add(message17)
    db.session.add(message18)
    db.session.add(message19)
    db.session.add(message_blake)
    db.session.add(message20)
    db.session.add(message21)
    db.session.add(message22)
    db.session.add(message_nick)
    db.session.add(message23)
    db.session.add(message24)
    db.session.add(message25)
    db.session.add(message26)
    db.session.add(message27)
    db.session.add(message28)
    db.session.add(message29)
    db.session.add(message30)
    db.session.add(message31)
    db.session.add(message32)

    # seed_channel_users():
    seed_channel_list = [channel2, channel3, channel4, channel5, channel6]
    demo.channels.extend(seed_channel_list)
    sharon.channels.extend(seed_channel_list)
    gabriel.channels.extend(seed_channel_list)
    cecilia.channels.extend(seed_channel_list)

    ali.channels.extend(seed_channel_list)
    jojo.channels.extend(seed_channel_list)
    jason_li.channels.extend(seed_channel_list)

    demo.channels.append(dms1)
    cecilia.channels.append(dms1)
    demo.channels.append(dms2)
    demo.channels.append(dms3)
    sharon.channels.append(dms3)
    gabriel.channels.append(dms2)

    db.session.commit()


def undo_seed_all():
    # undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

    # undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()

    # undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()

    # undo_channel_users():
    db.session.execute('TRUNCATE channel_users RESTART IDENTITY CASCADE;')
    db.session.commit()
