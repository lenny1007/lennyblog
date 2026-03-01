---
title: "Swift - CoreBluetooth 藍牙開發"
description: "import CoreBluetooth Step2. 實現&nbsp;CBPeripheralManagerDelegate 需要實現功能&nbsp;&nbsp;peripheralManagerDidUpdateState ， 並將對應的功能填入對應狀態變化的時候。 extension ViewController: CBPeripheralManagerDelegate { &nbsp; &"
pubDate: "2018-03-09"
category: "技術"
tags: ["IOS", "Swift"]
---

iOS 的藍牙開發主要是透過 CoreBluetooth 框架來實現的。 

# iOS 藍牙開發的關鍵概念

  * ## Centrals and Peripherals

    * Centrals 中心設備 ： 用來掃描周圍藍牙硬體的裝置， 比如使用手機的藍牙來掃描並連接智能手環， 這時候手機就是中心設備 。
    * Peripherals 外部設備 ： 被掃瞄的裝置。 以上面的例子智能手環就是外部設備。
  * ## Advertising Packets

    * 外部設備會廣播藍牙訊號 (advertising packets) ， 而中心設備的工作為掃描這些訊號， 並辨別出任何相關的外部設備， 可以與個別的裝置連結來取得更多的資訊。
  * ## Services and Characteristics

    * services 服務： 外部設備廣播和運行時會有服務， 可以理解為一個功能模組， 中心設備可以讀取服務。 外部設備可以有多個服務。
    * Characteristics 特徵： 在服務中的一個單位， 一個服務 service可以有多個特徵， 特徵會有一個值， 一般來說讀寫的數據就是這個值。

* * *

注意事項： Simulator不支援藍牙功能。 注意事項： 外部設備與中心設備版本， 需要兩隻蘋果裝置， 各一隻。 

# CoreBluetooth的外部設備版本

### 專案設置 : Swift4 + Xcode9

Step1. 導入 CoreBluetooth 
    
    
    import CoreBluetooth

Step2. 實現 CBPeripheralManagerDelegate 需要實現功能  peripheralManagerDidUpdateState ， 並將對應的功能填入對應狀態變化的時候。 
    
    
    extension ViewController: CBPeripheralManagerDelegate {
        func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager) {
            switch peripheral.state {
            case .unknown:
                print("未知的")
            case .resetting:
                print("重置中"
            case .unsupported:
                print("未支持")
            case .unauthorized:
                print("未驗證")
            case .poweredOff:
                print("關閉")
            case .poweredOn:
                print("啟動")
                // 在此創建服務 、 廣播
                setupServiceAndCharacteristics()
    
    self.peripheralManager?.startAdvertising([CBAdvertisementDataServiceUUIDsKey : [CBUUID.init(string: Service_UUID)]])
            }
        }
    }

Step3.  創建服務 、 廣播 
    
    
    private func setupServiceAndCharacteristics() {
            let serviceID = CBUUID.init(string: Service_UUID)
            let service = CBMutableService.init(type: serviceID, primary: true)
            let characteristicID = CBUUID.init(string: Characteristic_UUID)
            let characteristic = CBMutableCharacteristic.init(type: characteristicID,
                                                              properties: [.read, .write, .notify],
                                                              value: nil,
                                                              permissions: [.readable, .writeable])
            service.characteristics = [characteristic]
            self.peripheralManager?.add(service)
            self.characteristic = characteristic
        }

Step4. 實現外部設備對應的Callback
    
    
        func peripheralManager(_ peripheral: CBPeripheralManager, didReceiveRead request: CBATTRequest) {
       // 當中心設備讀取數據時的callback
    }
          func peripheralManager(_ peripheral: CBPeripheralManager, didReceiveWrite requests: [CBATTRequest]) {
      // 中心設備發送數據時， 接收數據並寫入textField
       }

   這樣就完成最基本的外部設備的藍牙傳送、接收的功能了。

* * *

# CoreBluetooth的中心裝置版本

步驟幾乎相同， 不同的是實現 CBCentralManagerDelegate 的協議， 如果需要也有廣播的功能， 可以在實現 CBPeripheralDelegate 協議。 
    
    
    extension ViewController: CBCentralManagerDelegate, CBPeripheralDelegate {}
    

實現下列的函式 
    
    
    /** 找到符合要求的外部設備 */
        func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
            self.peripheral = peripheral
            central.connect(peripheral, options: nil)
        }
        
        /** didConnect Success */
        func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
            self.centralManager?.stopScan()
            peripheral.delegate = self
            peripheral.discoverServices([CBUUID.init(string: Service_UUID)])
            print("didConnect Success")
        }
    

當連接成功的時候會呼叫上面的函式。    func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) 為了省電， 當連接上外部設備後， 就讓中心設備停止掃描。  
    
    
      /** Find Characteristic */
        func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
            for characteristic: CBCharacteristic in service.characteristics! {
                print("外部設備中的特徵有：\(characteristic)")
            }
         
            self.characteristic = service.characteristics?.last
            // Read characteristic
            peripheral.readValue(for: self.characteristic!)
            // 訂閱
            peripheral.setNotifyValue(true, for: self.characteristic!)
        }
    
    
        // 外部設備發送數據時， 接收數據並寫入textField
        func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
            let data = characteristic.value
            self.textField.text = String.init(data: data!, encoding: String.Encoding.utf8)
        }

這樣便完成藍芽中心裝置的基本設定了。 有些細節寫在專案裡， 就不一一寫入文章中了， 請大家下載專案自行玩看看， 就會更了解藍牙的運作模式。 [hf_form slug="%e4%b8%8b%e8%bc%89%e7%af%84%e4%be%8b%e7%a8%8b%e5%bc%8f%e7%a2%bc-swift-corebluetooth-%e8%97%8d%e7%89%99%e9%96%8b%e7%99%bc"]
