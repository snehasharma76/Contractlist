//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract APIConsumer is ChainlinkClient, Ownable {
    using Chainlink for Chainlink.Request;
    
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    string private api_endpoint;

    bytes32 public addr;
    
    constructor(address _linkaddress, address _oracle, string memory _jobId) {
        setChainlinkToken(_linkaddress);                                                                                                                                                                        
        oracle = _oracle;
        jobId = keccak256(abi.encodePacked(_jobId));
        fee = 0.01 * 10 ** 18;
    }

    function uint2str(uint _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len;
        while (_i != 0) {
            k = k-1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function setAPIEndpoint(string memory _api_endpoint) external onlyOwner {
        api_endpoint = _api_endpoint;
    }
   
    function setOracle(address _oracle) external onlyOwner {
        require(_oracle != address(0));
        oracle = _oracle;
    }
    
    function setFees(uint256 _fee) external onlyOwner {
        require(_fee > 0);
        fee = _fee;
    }

    function setJobId(bytes32 _jobId) external onlyOwner {
        jobId = _jobId;
    }

    /**
     * Get the oracle
     * @return oracleAddress 
     */ 
    function getOracle() external view returns(address oracleAddress) {
        return oracle;
    }

    /**
     * Get the feeAmount that is in LINK tokens
     * @return feeAmount
     */ 
    function getFees() external view returns(uint256 feeAmount) {
        return fee;
    }

    /**
     * Get the jobId
     * @return jobIdentifier
     */ 
    function getJobId() external view returns(bytes32 jobIdentifier) {
        return jobId;
    }
    
    function requestContractAddress(string memory _pathOfValue) public returns (bytes32 requestId) {        
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        request.add("get", api_endpoint);
        request.add("path", _pathOfValue);
        
        // Sends the request
        requestId = sendChainlinkRequestTo(oracle, request, fee);
        return requestId;
    }    
   
    function fulfill(bytes32 _requestId, bytes32 _addr) public recordChainlinkFulfillment(_requestId)  {
        addr = _addr;
    }    
}
