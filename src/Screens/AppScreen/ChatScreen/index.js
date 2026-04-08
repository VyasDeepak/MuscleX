import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Colors, fonts } from '../../../theme/Colors'
import { imagespath } from '../../../theme/imagespath'

const { width } = Dimensions.get('window')

// Dummy chat messages data
const chatMessages = [
  {
    id: '1',
    message: 'Hi michelle 👋 how are you today?',
    sender: 'me',
    timestamp: '10:58 PM',
  },
  {
    id: '2',
    message: 'Hi Beatrice, I am good, what happen?',
    sender: 'other',
    timestamp: '11:05 PM',
  },
  {
    id: '3',
    message: "I just got a dog! it's my birthday gift from my parents",
    sender: 'me',
    timestamp: '11:09 PM',
  },
  {
    id: '4',
    message: 'Hi Beatrice, I am good, what happen?',
    sender: 'other',
    timestamp: '11:05 PM',
  },
  {
    id: '5',
    message: 'Hi michelle 👋 how are you today?',
    sender: 'me',
    timestamp: '10:58 PM',
  },
  {
    id: '6',
    message: 'Hi Beatrice, I am good, what happen?',
    sender: 'other',
    timestamp: '11:05 PM',
  },
]

const ChatScreen = (props) => {
  const [messages, setMessages] = useState(chatMessages)
  const [inputMessage, setInputMessage] = useState('')
  const flatListRef = useRef(null)

  useEffect(() => {
    // Auto scroll to end when messages change
    if (flatListRef.current) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true })
      }, 100)
    }
  }, [messages])

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return

    const newMessage = {
      id: (messages.length + 1).toString(),
      message: inputMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages([...messages, newMessage])
    setInputMessage('')
  }

  const renderMessage = ({ item }) => (
    <View style={styles.messageContainer}>
      {item.sender === 'me' ? (
        <>
          <View style={styles.messageSpacer} />
          <View style={styles.messageRow}>
            <View style={styles.timeSpacer} />
            <Text style={styles.timestamp}>{item.timestamp}</Text>
          </View>
          <View style={styles.messageRow}>
            <View style={styles.messageSpacer} />
            <View style={[styles.messageBubble, styles.sentBubble]}>
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.messageRow}>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            <View style={styles.timeSpacer} />
          </View>
          <View style={styles.messageRow}>
            <View style={[styles.messageBubble, styles.receivedBubble]}>
              <Text style={styles.messageTextReceived}>{item.message}</Text>
            </View>
            <View style={styles.messageSpacer} />
          </View>
        </>
      )}
    </View>
  )

  return (
    <View style={styles.container}>
      {/* Chat Header */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => props.navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={imagespath?.back_arrow}
            resizeMode="contain"
            style={{ width: 24, height: 24 }}
          />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image
            source={imagespath?.profile_icon}
            style={styles.profileImage}
            resizeMode="contain"
          />
          <View style={styles.headerInfo}>
            <Text style={styles.userName}>Michelle</Text>
            {/* <Text style={styles.userStatus}>Active 4m ago</Text> */}
          </View>
        </View>
        {/* 
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuDot}>•••</Text>
        </TouchableOpacity> */}
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 60}
      >
        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        />

        {/* Chat Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={Colors.gray}
            value={inputMessage}
            onChangeText={setInputMessage}
            multiline={true}
            maxLength={500}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BG_COLOR,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.BG_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light_gray,
  },
  backButton: {
    // padding: 8,
    marginRight: 8,
  },
  backText: {
    fontSize: fonts.font_size_24,
    color: Colors.black,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 24,
    marginRight: 12,
  },
  headerInfo: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: fonts.font_size_16,
    fontFamily: fonts.robot_semi_bold,
    color: Colors.black,
  },
  userStatus: {
    fontSize: fonts.font_size_12,
    fontFamily: fonts.robot_regular,
    color: '#7986CB',
    marginTop: 2,
  },
  menuButton: {
    padding: 8,
    marginLeft: 12,
  },
  menuDot: {
    fontSize: fonts.font_size_20,
    color: '#FF1493',
    fontFamily: fonts.robot_bold,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  messageContainer: {
    marginBottom: 8,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'flex-end',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  sentBubble: {
    backgroundColor: '#0570E1',
    marginLeft: 'auto',
  },
  receivedBubble: {
    backgroundColor: '#E8E8F0',
  },
  messageText: {
    fontSize: fonts.font_size_14,
    fontFamily: fonts.robot_regular,
    color: Colors.white,
  },
  messageTextReceived: {
    fontSize: fonts.font_size_14,
    fontFamily: fonts.robot_regular,
    color: '#1A237E',
  },
  timestamp: {
    fontSize: fonts.font_size_12,
    fontFamily: fonts.robot_regular,
    color: Colors.gray,
    marginHorizontal: 8,
  },
  messageSpacer: {
    flex: 1,
  },
  timeSpacer: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.BG_COLOR,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.light_gray,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: fonts.font_size_14,
    fontFamily: fonts.robot_regular,
    color: Colors.black,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#0570E1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 2,
  },
  sendButtonText: {
    color: Colors.white,
    fontSize: fonts.font_size_14,
    fontFamily: fonts.robot_semi_bold,
  },
})